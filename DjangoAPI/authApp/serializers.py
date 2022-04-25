from rest_framework import serializers
from authApp.models import Pointage
from authApp.models import User,Employee

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id',
                  'user_first_name',
                  'user_last_name',
                  'numero_matricule',
                  'password'
                  )
        
class Employee_serializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('employee_id',
                  'employee_first_name',
                  'employee_last_name',
                  'numero_matricule',
                  'department',
                  'password'
                  )
        
class Pointage_serializer(serializers.ModelSerializer):
    class Meta:
        model = Pointage
        fields = ('pointage_id',
                  'employee',
                  'date',
                  'entry_time',
                  'exit_time',
                  )