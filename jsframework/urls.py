from django.conf.urls import url, patterns
from . import views

from views import PackageListCreateView
from views import PackageRetrieveUpdateView
from views import StudentListCreateView
from views import StudentRetrieveUpdateDestroyView


urlpatterns = patterns(
    '',

    url(r'^$', views.index, name='index'),

    # Packages
    url(r'^api/packages$', PackageListCreateView.as_view()),
    url(r'^api/packages/(?P<pk>[0-9]+)$', PackageRetrieveUpdateView.as_view()),

    # Students
    url(r'^api/students$', StudentListCreateView.as_view()),
    url(r'^api/students/(?P<pk>[0-9]+)$', StudentRetrieveUpdateDestroyView.as_view()),
)