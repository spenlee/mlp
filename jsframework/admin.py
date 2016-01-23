from django.contrib import admin
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
csrf_protect_m = method_decorator(csrf_protect)

# Register your models here.
