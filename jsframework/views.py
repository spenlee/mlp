from django.shortcuts import render
from rest_framework import generics

from models import Package
from serializers import PackageSerializer


def index(request):
    return render(request, 'jsframework/base.html')


class PackageListCreateView(generics.ListCreateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer


class PackageRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer