from django.conf import settings
from django.contrib.auth.models import User, Group
from rest_framework import serializers

from mailadmin.models import OrgUnit


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)

    class Meta:
        model = User
        exclude = ['password', 'user_permissions']


class OrgUnitSerializer(serializers.ModelSerializer):
    admin_groups = GroupSerializer(many=True)
    member_groups = GroupSerializer(many=True)

    class Meta:
        model = OrgUnit


class ForwardSerializer(serializers.Serializer):
    dest = serializers.EmailField(required=True)
    forward = serializers.EmailField(required=True)
    _domain = settings.NEUF_EMAIL_DOMAIN

    def validate_dest(self, attrs, source):
        domain_part = attrs[source].split('@')[1]
        if domain_part != self._domain:
            raise serializers.ValidationError("dest '{0}' is not in domain {1}".format(attrs[source], self._domain))

        return attrs