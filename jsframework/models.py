from django.db import models


# Create your models here.
class Package(models.Model):
    first_name = models.CharField(max_length=252)
    last_name = models.CharField(max_length=252)
    address = models.CharField(max_length=252)