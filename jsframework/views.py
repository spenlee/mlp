from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from models import Package
from models import Student
from models import ScanData
from serializers import PackageSerializer
from serializers import StudentSerializer
from serializers import ScanDataSerializer
# http://cd25230b.ngrok.io/#/

from django_drf_starter_project.scripts import enqueue


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


class ScanDataListCreateView(generics.ListCreateAPIView):
    queryset = ScanData.objects.all()
    serializer_class = ScanDataSerializer

    # every time scan data comes in, cross-reference students
    def post(self, request, *args, **kwargs):
        """ Handles create requests holding scan data
        """

        scan_data = self.create(request, *args, **kwargs).data

        student = Student.objects.filter(first_name=scan_data['first_name'],
                                         last_name=scan_data['last_name'])
        # empty queryset
        if not student:
            return Response(
                'Mail recipient is not in student database',
                 status=400
            )
        else:
            # access the queryset,
            if len(student) > 1:
                return Response(
                    'Multiple students with same info',
                     status=400
                )
            else:
                # run the queue, with student information
                student = student[0]
                enqueue.enqueueNotification(student.phone_number, student.first_name)
                return Response(status=200)


class ScanDataRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ScanData.objects.all()
    serializer_class = ScanDataSerializer