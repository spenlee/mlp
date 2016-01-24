from django.db import models


# Create your models here.
class Package(models.Model):
    tracking_number = models.CharField(max_length=25, primary_key=True)
    first_name = models.CharField(max_length=252)
    last_name = models.CharField(max_length=252)
    address = models.CharField(max_length=252)
    log_date = models.DateTimeField(auto_now_add=True)
    pickup_date = models.DateTimeField(null=True)
    archived = models.BooleanField(default=False)


class Student(models.Model):
    student_id = models.PositiveIntegerField(primary_key=True)
    email = models.CharField(max_length=252, unique=True)
    first_name = models.CharField(max_length=252)
    last_name = models.CharField(max_length=252)
    phone_number = models.CharField(max_length=11, unique=True)
    sms_number = models.CharField(max_length=11, unique=True)
    address = models.CharField(max_length=252)


class ScanData(models.Model):
    first_name = models.CharField(max_length=252)
    last_name = models.CharField(max_length=252)
    address = models.CharField(max_length=252)
    # tracking_number