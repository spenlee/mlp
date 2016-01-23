# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('tracking_number', models.PositiveIntegerField(serialize=False, primary_key=True)),
                ('first_name', models.CharField(max_length=252)),
                ('last_name', models.CharField(max_length=252)),
                ('address', models.CharField(max_length=252)),
                ('log_date', models.DateTimeField(auto_now_add=True)),
                ('pickup_date', models.DateTimeField(null=True)),
            ],
        ),
    ]
