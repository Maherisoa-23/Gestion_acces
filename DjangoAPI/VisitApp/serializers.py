from rest_framework import serializers
<<<<<<< HEAD
from VisitApp.models import Visits, Visits_register,Lieu
=======
from VisitApp.models import Visits_actif, Visits_register,Lieu, Visitors
>>>>>>> dev_test_prod

class Visitor_serializer(serializers.ModelSerializer):
    class Meta:
        model = Visitors
        fields = (
                  'visitor_id',
                  'visitor_name',
                  'CIN',
                  'comment'
                  )
        
class Visit_serializer(serializers.ModelSerializer):
    class Meta:
<<<<<<< HEAD
        model = Visits
        fields = ('visitor_name',
                  'motif',
                  'CIN',
=======
        model = Visits_actif
        fields = ('visitor_name',
                  'motif',
                  'CIN',
                  'comment',
>>>>>>> dev_test_prod
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
        
class Lieu_serializers(serializers.ModelSerializer):
    class Meta:
        model = Lieu
        fields = ('lieu_id',
                  'lieu_name',
                  'total_employee',
                  'isActive',
                  'entry_time'
                  )