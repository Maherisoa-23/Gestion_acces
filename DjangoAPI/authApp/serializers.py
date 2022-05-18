from rest_framework import serializers
from authApp.models import Pointage
from authApp.models import User,Employee,Department,Pointage,Pointage_register,Active_connection,Connection_register

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
                  'user_name',
                  'numero_matricule',
                  )
        
class Employee_serializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
                  'employee_name',
                  'function',
                  'lieu',
                  'numero_matricule',
                  'department',
                  'department_name',
                  'pointed_at'
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
                  'numero_matricule',
                  'employee_name',
                  'employee_dep_name',
                  'date',
                  'lieu',
                  'entry_time'
                  )
        
class Pointage_register_serializer(serializers.ModelSerializer):
    class Meta:
        model = Pointage_register
        fields = ('pointage_register_id',
                  'numero_matricule',
                  'employee_name',
                  'employee_dep_name',
                  'date',
                  'lieu',
                  'entry_time',
                  'exit_time',
                  )   
        
class Active_connection_serializer(serializers.ModelSerializer):
    class Meta:
        model = Active_connection
        fields = ('active_connection_id',
                  'numero_matricule',
                  'employee_name',
                  'date',
                  'lieu',
                  'entry_time'
                  )   
        
class Connection_register_serializer(serializers.ModelSerializer):
    class Meta:
        model = Connection_register
        fields = ('connection_register_id',
                  'numero_matricule',
                  'employee_name',
                  'date',
                  'lieu',
                  'entry_time',
                  'exit_time'
                  )    