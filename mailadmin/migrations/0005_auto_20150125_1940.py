# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mailadmin', '0004_auto_20150125_1401'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='prefix',
            options={'verbose_name_plural': 'prefixes'},
        ),
    ]
