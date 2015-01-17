from rest_framework import permissions
from mailadmin.models import OrgUnit
import re

from mailadmin.serializers import AliasSerializer


class SourcePrefixOwner(permissions.BasePermission):
    # Ref: http://www.django-rest-framework.org/api-guide/permissions
    # TODO have no idea if this works
    def has_permission(self, request, view):
        # Read permissions (GET, HEAD or OPTIONS) are allowed for all authenticated request
        if request.method in permissions.SAFE_METHODS and request.user and request.user.is_authenticated():
            return True

        # TODO test handling the DELETE requests
        if request.user.is_superuser:
            return True

        if request.method in ['DELETE', 'POST']:
            print view
            print view.kwargs
            forwarder = view.kwargs['forwarder']  # TODO you are here
            invalid_forwarder = {'error': 'Invalid forwarder: {0}'.format(forwarder)}
            if '=' not in forwarder:
                return True

            fwd_data = forwarder.split("=")
            fw = AliasSerializer(data={'dest': fwd_data[0], 'forward': fwd_data[1]})
        else:
            fw = AliasSerializer(data=request.DATA)

        if not fw.is_valid():
            return True  # Skip auth if not valid data

        my_groups = request.user.groups.all()
        # Look for mailinglist prefixes
        my_prefixes = OrgUnit.objects.filter(admin_groups__in=my_groups).distinct().exclude(prefix__isnull=True).exclude(is_active=False).values_list('prefix', flat=True)
        if len(my_prefixes) == 0:
            return False
        # Prepare regular expression
        regexp = '|'.join(['^{0}-'.format(p) for p in my_prefixes])
        # The destination should have at least one match with the prefix regexp
        return re.search(regexp, fw.data['dest']) is not None