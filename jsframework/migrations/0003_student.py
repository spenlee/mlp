# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jsframework', '0002_package_archived'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('student_id', models.PositiveIntegerField(serialize=False, primary_key=True)),
                ('email', models.CharField(unique=True, max_length=252)),
                ('first_name', models.CharField(max_length=252)),
                ('last_name', models.CharField(max_length=252)),
                ('phone_number', models.PositiveIntegerField(unique=True, max_length=10)),
                ('address', models.CharField(max_length=252)),
            ],
        ),
    ]
