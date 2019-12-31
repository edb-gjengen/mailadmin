from django.conf import settings
from django.contrib.auth.models import User, Group
from rest_framework import serializers

from mailadmin.models import OrgUnit
from rest_framework.relations import SlugRelatedField


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
    prefixes = SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name')

    class Meta:
        model = OrgUnit
        fields = ['id', 'admin_groups', 'member_groups', 'prefixes', 'inside_id', 'name', 'is_active',
                  'created', 'update']


class AliasSerializer(serializers.Serializer):
    source = serializers.EmailField(required=True)
    destination = serializers.EmailField(required=True)
    domain = serializers.IntegerField(required=True)

    def validate_source(self, value):
        _domain_name = settings.NEUF_EMAIL_DOMAIN_NAME

        domain_part = value.split('@')[1]
        if domain_part != _domain_name:
            raise serializers.ValidationError("source '{0}' is not in domain {1}".format(value, _domain_name))

        return value
