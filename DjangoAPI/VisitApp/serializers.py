from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from VisitApp.models import Visits

class Visit_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visits
        fields = ('visitor_id',
                  'visitor_first_name',
                  'visitor_last_name',
                  'motif',
                  'CIN'
                  )