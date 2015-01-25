from rest_framework import permissions
import re

from mailadmin.serializers import AliasSerializer


class SourcePrefixOwner(permissions.BasePermission):
    """ Ref: http://www.django-rest-framework.org/api-guide/permissions """

    def has_permission(self, request, view):
        assert hasattr(view, 'get_user_prefixes')

        # Read permissions (GET, HEAD or OPTIONS) are allowed for all authenticated request
        if request.method in permissions.SAFE_METHODS or request.method not in ['DELETE', 'POST']:
            return True

        if request.user.is_superuser:
            return True

        serializer = AliasSerializer(data=request.data, many=True)

        if not serializer.is_valid():
            return True  # Skip auth if not valid data

        my_prefixes = view.get_user_prefixes(request)
        if len(my_prefixes) == 0:
            return False

        # Prepare regular expression
        regexp = my_prefixes.as_regex()
        # All source-adresses should match the prefix regexp
        for alias in serializer.initial_data:
            if re.search(regexp, alias.get('source', '')) is None:
                return False

        return True