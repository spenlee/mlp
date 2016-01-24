from rest_framework import serializers
from models import Package
from models import Student
from models import ScanData

class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student


class ScanDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ScanData
