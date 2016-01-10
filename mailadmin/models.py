from __future__ import unicode_literals
from django.contrib.auth.models import Group
from django.db import models


class OrgUnit(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    admin_groups = models.ManyToManyField(Group, blank=True, related_name='admin_orgunits')
    member_groups = models.ManyToManyField(Group, blank=True, related_name='member_orgunits')
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    inside_id = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['name']


class PrefixQueryset(models.QuerySet):

    def as_regex(self):
        prefixes = self.values_list('name', flat=True)
        return '|'.join(['^{0}-|^{0}@'.format(p) for p in prefixes])


class Prefix(models.Model):
    def __str__(self):
        return self.name or ''

    name = models.CharField(max_length=500, blank=True, null=True)
    orgunit = models.ForeignKey('mailadmin.OrgUnit', related_name='prefixes')

    objects = PrefixQueryset.as_manager()

    class Meta:
        verbose_name_plural = 'prefixes'
