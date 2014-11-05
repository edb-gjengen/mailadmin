# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrgUnit',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=500)),
                ('prefix', models.CharField(max_length=256, null=True, blank=True)),
                ('posix_group', models.CharField(max_length=256, null=True, blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('update', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(to='auth.Group', null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
