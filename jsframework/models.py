from django.db import models


# Create your models here.
class Package(models.Model):
    tracking_number = models.PositiveIntegerField(primary_key=True)
    first_name = models.CharField(max_length=252)
    last_name = models.CharField(max_length=252)
    address = models.CharField(max_length=252)
    log_date = models.DateTimeField(auto_now_add=True)
    pickup_date = models.DateTimeField(null=True)
    archived = models.BooleanField(default=False)
