from rest_framework import serializers
from models import Package
from models import Student

class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student


