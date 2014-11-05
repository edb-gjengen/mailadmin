# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
        ('mailadmin', '0002_orgunit_inside_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='orgunit',
            options={'ordering': ['name']},
        ),
        migrations.RemoveField(
            model_name='orgunit',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='orgunit',
            name='posix_group',
        ),
        migrations.AddField(
            model_name='orgunit',
            name='admin_groups',
            field=models.ManyToManyField(related_name='admin_orgunits', null=True, to='auth.Group', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='orgunit',
            name='member_groups',
            field=models.ManyToManyField(related_name='member_orgunits', null=True, to='auth.Group', blank=True),
            preserve_default=True,
        ),
    ]
