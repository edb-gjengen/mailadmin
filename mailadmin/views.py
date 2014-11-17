from django.conf import settings
from django.contrib.auth import login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from rest_framework import viewsets, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mailadmin.api import CPanel
from mailadmin.models import OrgUnit
from mailadmin.serializers import UserSerializer, OrgUnitSerializer, ForwardSerializer
from mailadmin.permissions import DestinationPrefixOwner


def index(request):
    form = {}
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            # Log the user in.
            login(request, form.get_user())
            return redirect('home')
    else:
        if request.user.is_authenticated():
            return redirect('home')
        else:
            form = AuthenticationForm(request)

    return render(request, "index.html", {'form': form})

@login_required
def home(request):
    return render(request, "home.html")


def logout(request):
    auth_logout(request)
    return redirect('index')


class ForwardsViewSet(viewsets.ViewSet):
    """
    Forwards from cPanel
    """

    permission_classes = [IsAuthenticated]

    def list(self, request):
        group_filter = request.QUERY_PARAMS.get('groups', None)
        if group_filter is None:
            my_groups = request.user.groups.all()
        else:
            # Filter groups
            if ',' in group_filter:
                group_filter = group_filter.split(',')
            else:
                group_filter = [group_filter]
            my_groups = request.user.groups.filter(pk__in=group_filter)

        # Look for mailinglist prefixes
        my_prefixes = OrgUnit.objects.filter(admin_groups__in=my_groups).distinct().values_list('prefix', flat=True)
        # Prepare regular expression
        regexp = '|'.join(['{0}-'.format(p) for p in my_prefixes])

        if len(my_prefixes) == 0:
            return Response({'result': 'No results'})  # Need at least one

        cp = CPanel()
        params = dict(
            domain=settings.NEUF_EMAIL_DOMAIN,
            regex=regexp
        )

        res = cp.api('Email', 'listforwards', params)
        return Response(res)


class ForwardCreateView(views.APIView):
    _cp = CPanel()
    permission_classes = (DestinationPrefixOwner,)

    def post(self, request):
        fw = ForwardSerializer(data=request.DATA)
        if not fw.is_valid():
            return Response(fw.errors, status=400)

        # fw.data
        params = dict(
            domain=settings.NEUF_EMAIL_DOMAIN,
            email=fw.data['dest'].replace('@{0}'.format(settings.NEUF_EMAIL_DOMAIN), ''),
            fwdopt='fwd',
            fwdemail=fw.data['forward']
        )
        res = self._cp.api('Email', 'addforward', params)
        return Response(res)


class ForwardDeleteView(views.APIView):
    _cp = CPanel()

    def delete(self, request, forwarder=None):
        invalid_forwarder = {'error': 'Invalid forwarder: {0}'.format(forwarder)}
        if '=' not in forwarder:
            return Response(invalid_forwarder, status=400)

        fwd_data = forwarder.split("=")

        fw = ForwardSerializer(data={'dest': fwd_data[0], 'forward': fwd_data[1]})
        if not fw.is_valid():
            return Response(fw.errors, status=400)

        params = {
            'arg-0': '{0}={1}'.format(fw.data['dest'], fw.data['forward'])
        }
        res = self._cp.api('Email', 'delforward', params, version=1)
        return Response(res)


class MyUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.none()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)


class MyOrgUnitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrgUnit.objects.none()
    serializer_class = OrgUnitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OrgUnit.objects.filter(admin_groups__in=self.request.user.groups.values('id'))


class OrgUnitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrgUnit.objects.all()
    serializer_class = OrgUnitSerializer
    permission_classes = [IsAuthenticated]
