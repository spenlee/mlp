from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny

from models import Package
from models import Student
from serializers import PackageSerializer
from serializers import StudentSerializer


def index(request):
    return render(request, 'jsframework/base.html')


class PackageListCreateView(generics.ListCreateAPIView):
    serializer_class = PackageSerializer
    permission_classes = (AllowAny,)


    def get_queryset(self):
        return Package.objects.filter(archived=False)


class PackageRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = PackageSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Package.objects.filter(archived=False)


class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer