# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def normalize_prefixes(apps, schema_editor):
    Prefix = apps.get_model("mailadmin", "Prefix")
    OrgUnit = apps.get_model("mailadmin", "OrgUnit")

    for ou in OrgUnit.objects.all():
        Prefix.objects.create(name=ou.prefix, orgunit=ou)


def noop(*args, **kwargs):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('mailadmin', '0003_auto_20141105_2153'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prefix',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=500, null=True, blank=True)),
                ('orgunit', models.ForeignKey(related_name='prefixes', to='mailadmin.OrgUnit')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RunPython(normalize_prefixes, noop),
        migrations.RemoveField(
            model_name='orgunit',
            name='prefix',
        ),
    ]
