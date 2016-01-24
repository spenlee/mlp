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
                ('archived', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('student_id', models.PositiveIntegerField(serialize=False, primary_key=True)),
                ('email', models.CharField(unique=True, max_length=252)),
                ('first_name', models.CharField(max_length=252)),
                ('last_name', models.CharField(max_length=252)),
                ('phone_number', models.CharField(unique=True, max_length=11)),
                ('sms_number', models.CharField(unique=True, max_length=11)),
                ('address', models.CharField(max_length=252)),
            ],
        ),
    ]
