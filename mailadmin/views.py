from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from mailadmin.api import CPanel


def home(request):
    return render(request, "home.html")


class ForwardsViewSet(viewsets.ViewSet):
    """
    A simple ViewSet that for listing forwards
    """
    def list(self, request):
        cp = CPanel()
        regexp = self.request.QUERY_PARAMS.get('regexp', None)
        # TODO
        # Get prefixes for his groups
        #u = request.user
        #print u
        # Define regexp
        #regexp = 'kak-*'
        params = dict(
            domain='studentersamfundet.no',
            regex=regexp
        )
        res = cp.api('Email', 'listforwards', params)
        return Response(res)