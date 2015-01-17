from django.conf import settings
from django.contrib.auth import login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
import logging
from requests import exceptions
from rest_framework import viewsets, views
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from mailadmin.api import DjangoPostfixDovecotAPI
from mailadmin.models import OrgUnit
from mailadmin.serializers import UserSerializer, OrgUnitSerializer, AliasSerializer
from mailadmin.permissions import SourcePrefixOwner


logger = logging.getLogger(__name__)


def index(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            # Log the user in.
            login(request, form.get_user())
            return redirect('lists')
    else:
        if request.user.is_authenticated():
            return redirect('lists')
        else:
            form = AuthenticationForm(request)

    return render(request, "index.html", {'form': form})


@login_required
def lists(request):
    return render(request, "lists.html")


def logout(request):
    auth_logout(request)
    return redirect('index')


class AliasesView(views.APIView):
    """ List, create and delete aliases from django-postfix-dovecot-api """
    _api = DjangoPostfixDovecotAPI()
    permission_classes = (SourcePrefixOwner,)

    def get(self, request):
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
        orgunits = OrgUnit.objects.exclude(prefix__isnull=True).exclude(is_active=False).distinct()
        if not request.user.is_superuser:
            orgunits = orgunits.filter(admin_groups__in=my_groups)

        my_prefixes = orgunits.values_list('prefix', flat=True)
        # Prepare regular expression
        regexp = '|'.join(['^{0}-|^{0}@'.format(p) for p in my_prefixes])
        if len(my_prefixes) == 0:
            return Response({'result': 'No results'})  # Need at least one

        res = self._api.list_aliases_regex(regexp)

        return Response(res)

    def post(self, request):
        aliases = AliasSerializer(data=request.data, many=True)
        if not aliases.is_valid():
            return Response(aliases.errors, status=status.HTTP_400_BAD_REQUEST)

        res = self._api.create_aliases(aliases.data)

        return Response(res)

    def delete(self, request):
        aliases = AliasSerializer(data=request.data, many=True)
        if not aliases.is_valid():
            return Response(aliases.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            # FIXME: not tested
            # res = self._api.delete_aliases(aliases)
            res = {'errors': 'Not implemented'}
        except exceptions.RequestException as e:
            logger.warning('mxapi errored {}'.format(e.strerror))
            return Response({'error': e.strerror}, status=status.HTTP_400_BAD_REQUEST)

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
        orgunits = OrgUnit.objects.exclude(prefix__isnull=True).exclude(is_active=False).distinct()
        if self.request.user.is_superuser:
            return orgunits

        group_ids = self.request.user.groups.values('id')
        return orgunits.filter(admin_groups__in=group_ids)


class OrgUnitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrgUnit.objects.all()
    serializer_class = OrgUnitSerializer
    permission_classes = [IsAuthenticated]


@api_view(['GET'])
def get_domain(request):
    api = DjangoPostfixDovecotAPI()
    domains = api.list_domains(name=settings.NEUF_EMAIL_DOMAIN_NAME)

    if len(domains) != 1:
        return Response({'domain': domains})

    return Response({'domain': domains[0]})