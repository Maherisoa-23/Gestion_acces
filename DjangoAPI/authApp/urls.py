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
    re_path(r'^security/$',views.security_API),
    re_path(r'^security/([0-9]+)$',views.security_API),
    re_path(r'^pointage_counter/$',views.pointage_counter_API),
    re_path(r'^pointage_counter/([0-9]+)$',views.pointage_counter_API),
    re_path(r'^daily_pointage/$',views.daily_pointage_API),
    ]
