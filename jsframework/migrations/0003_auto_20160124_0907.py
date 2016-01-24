# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jsframework', '0002_scandata'),
    ]

    operations = [
        migrations.AlterField(
            model_name='package',
            name='tracking_number',
            field=models.CharField(max_length=25, serialize=False, primary_key=True),
        ),
    ]
