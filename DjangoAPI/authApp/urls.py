from django.urls import re_path
from authApp import views

urlpatterns = [
    re_path(r'^user/$',views.user_API),
    re_path(r'^user/([0-9]+)$',views.user_API),
    re_path(r'^employee/$',views.employee_API),
    re_path(r'^employee/([0-9]+)$',views.employee_API),
    re_path(r'^pointage/([0-9]+)$',views.pointage_API),
    re_path(r'^pointage/$',views.pointage_API),
    re_path(r'^department/$',views.department_API),
    re_path(r'^pointage_register/([0-9]+)$',views.pointage_register_API),
    re_path(r'^pointage_register/$',views.pointage_register_API),
    re_path(r'^active_connection/([0-9]+)$',views.active_connection_API),
    re_path(r'^active_connection/$',views.active_connection_API),
    re_path(r'^connection_register/([0-9]+)$',views.connection_register_API),
    re_path(r'^connection_register/$',views.connection_register_API)
    ]
