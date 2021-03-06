from rest_framework import serializers
from authApp.models import Pointage
from authApp.models import User,Employee,Department,Pointage,Pointage_register,Stagiaire,Vehicule

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
                  'user_name',
                  'numero_matricule',
                  'password'
                  )
        
class Employee_serializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
                  'employee_name',
                  'function',
                  'numero_matricule',
                  'department_name',
                  'pointed_at',
                  'photoName'
                  )
        
class Stagiaire_serializer(serializers.ModelSerializer):
    class Meta:
        model = Stagiaire
        fields = (
                  'stagiaire_id',
                  'stagiaire_name',
                  'description',
                  'department_name',
                  'pointed_at',
                  'start_date',
                  'end_date',
                  'function',
                  'photoName'
                  )

class Vehicule_serializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicule
        fields = (
                  'vehicule_id',
                  'numero_matricule',
                  'vehicule_name',
                  'vehicule_marque',
                  'department_name',
                  'pointed_at',
                  'photoName'
                  )

class Department_serializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('department_id',
                  'department_name',
                  'department_short_name'
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
                  'entry_time',
                  'function',
                  'start_date',
                  'end_date',
                  )
        
class Pointage_register_serializer(serializers.ModelSerializer):
    class Meta:
        model = Pointage_register
        fields = ('pointage_register_id',
                  'numero_matricule',
                  'employee_name',
                  'employee_dep_name',
                  'date',
                  'function',
                  'lieu',
                  'entry_time',
                  'exit_time',
                  )
        
            