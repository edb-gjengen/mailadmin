from django.contrib.auth.models import Group
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from mailadmin.api import CPanel
from mailadmin.models import OrgUnit


def home(request):
    return render(request, "home.html")


class ForwardsViewSet(viewsets.ViewSet):
    """
    A simple ViewSet that for listing forwards
    """
    def list(self, request):
        cp = CPanel()
        regexp = self.request.QUERY_PARAMS.get('regexp', None)
        my_groups = request.user.groups.values_list('pk', flat=True)
        print my_groups
        ous = OrgUnit.objects.filter(admin_groups__in=my_groups).values_list('prefix', flat=True)
        ous = set(ous)
        print ous
        #regexp = 'kak-*'
        params = dict(
            domain='studentersamfundet.no',
            regex=regexp
        )
        res = cp.api('Email', 'listforwards', params)
        return Response(res)