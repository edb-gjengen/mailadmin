from rest_framework import permissions
from mailadmin.models import OrgUnit
import re

from mailadmin.serializers import ForwardSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner
        return obj.owner == request.user


class DestinationPrefixOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        fw = ForwardSerializer(data=request.DATA)
        if not fw.is_valid():
            return True  # Skip auth if not valid data

        my_groups = request.user.groups.all()
        # Look for mailinglist prefixes
        my_prefixes = OrgUnit.objects.filter(admin_groups__in=my_groups).distinct().values_list('prefix', flat=True)
        # Prepare regular expression
        regexp = '|'.join(['{0}-'.format(p) for p in my_prefixes])
        if len(my_prefixes) == 0:
            return False
        # The destination should have at least one match with the prefix regexp
        return re.search(regexp, fw.data['dest']) is not None