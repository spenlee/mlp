from rest_framework import serializers
from models import Package

class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package

