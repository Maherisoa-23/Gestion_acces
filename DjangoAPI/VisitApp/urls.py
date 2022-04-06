from django.urls import re_path
from VisitApp import views

urlpatterns = [
    re_path(r'^visit/$',views.visit_API),
    re_path(r'^visit/([0-9]+)$',views.visit_API),
    re_path(r'^visits_register/$',views.visit_register_API)
]
