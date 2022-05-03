from rest_framework import serializers
from VisitApp.models import Visits, Visits_register

class Visit_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visits
        fields = ('visit_id',
                  'visitor_name',
                  'motif',
                  'CIN',
                  'lieu',
                  'date',
                  'entry_time'
                  )
class Visits_register_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visits_register
        fields = ('visit_id',
                  'visitor_name',
                  'motif',
                  'CIN',
                  'lieu',
                  'date',
                  'entry_time',
                  'exit_time'
                  )