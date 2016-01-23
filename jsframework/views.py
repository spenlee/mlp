from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny

from models import Package
from serializers import PackageSerializer


def index(request):
    return render(request, 'jsframework/base.html')


class PackageListCreateView(generics.ListCreateAPIView):
    serializer_class = PackageSerializer
    permission_classes = (AllowAny,)


    def get_queryset(self):
        return Package.objects.filter(archived=False)


class PackageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PackageSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Package.objects.filter(archived=False)