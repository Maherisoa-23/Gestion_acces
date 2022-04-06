from django.urls import re_path
from authApp import views

urlpatterns = [
    re_path(r'^user/$',views.user_API),
    re_path(r'^user/([0-9]+)$',views.user_API)
    ]
