from rest_framework import serializers
from VisitApp.models import Visits_actif, Visits_register,Lieu, Visitors

class Visitor_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors 
        fields = (
                  'visitor_id',
                  'visitor_name',
                  'CIN',
                  'comment',
                  'description',
                  )
        
class Visit_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visits_actif
        fields = (
                  'visit_id',
                  'visitor_name',
                  'motif',
                  'CIN',
                  'comment',
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
                  'comment',
                  'lieu',
                  'date',
                  'entry_time',
                  'exit_time'
                  )
        
class Lieu_serializers(serializers.ModelSerializer):
    class Meta:
        model = Lieu
        fields = ('lieu_id',
                  'lieu_name',
                  'total_employee',
                  'isActive',
                  'entry_time'
                  )