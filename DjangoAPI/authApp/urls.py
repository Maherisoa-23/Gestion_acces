from django.urls import re_path
from authApp import views

urlpatterns = [
    re_path(r'^user/$',views.user_API),
    re_path(r'^user/([0-9]+)$',views.user_API),
    re_path(r'^employee/$',views.employee_API),
    re_path(r'^employee/([0-9]+)$',views.employee_API),
    re_path(r'^pointage/$',views.pointage_API)
    ]
