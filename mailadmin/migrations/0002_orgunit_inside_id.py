# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mailadmin', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='orgunit',
            name='inside_id',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
