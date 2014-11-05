from django.contrib.auth.models import Group
from django.db import models


class OrgUnit(models.Model):
    def __unicode__(self):
        return self.name

    name = models.CharField(max_length=500)
    prefix = models.CharField(max_length=256, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    admin_groups = models.ManyToManyField(Group, null=True, blank=True, related_name='admin_orgunits')
    member_groups = models.ManyToManyField(Group, null=True, blank=True, related_name='member_orgunits')
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    inside_id = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ['name']
