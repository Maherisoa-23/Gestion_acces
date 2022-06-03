from django.urls import re_path
from VisitApp import views

urlpatterns = [
    re_path(r'^visitor/$',views.visitor_API),
    re_path(r'^visitor/([0-9]+)$',views.visitor_API),
    re_path(r'^visit/$',views.visit_API),
    re_path(r'^visit/([A-z]+)$',views.visit_API),
    re_path(r'^visits_register/$',views.visit_register_API),
    re_path(r'^visits_register/([0-9]+)$',views.visit_register_API),
    re_path(r'^visit_counter/$',views.visit_counter_API),
    re_path(r'^visit_counter/([0-9]+)$',views.visit_counter_API),
    re_path(r'^lieu/$',views.lieu_API),
    re_path(r'^lieu/([0-9]+)$',views.lieu_API),
]
