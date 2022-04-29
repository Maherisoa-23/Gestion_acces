from rest_framework import serializers
from authApp.models import Pointage
from authApp.models import User,Employee,Department,Pointage,Pointage_register

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
                  'employee_name',
                  'function',
                  'numero_matricule',
                  'department',
                  'password'
                  )
class Department_serializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('department_id',
                  'department_name'
                  )        
        
             
class Pointage_serializer(serializers.ModelSerializer):
    class Meta:
        model = Pointage
        fields = ('pointage_id',
                  'employee',
                  'date',
                  'entry_time'
                  )
class Pointage_register_serializer(serializers.ModelSerializer):
    class Meta:
        model = Pointage_register
        fields = ('pointage_id',
                  'employee',
                  'date',
                  'entry_time',
                  'exit_time',
                  )        