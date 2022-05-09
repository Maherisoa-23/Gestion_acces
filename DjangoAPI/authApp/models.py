
from django.db import models

class User(models.Model) :
    user_name = models.CharField(max_length=100)
    numero_matricule = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=100)
    
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)
    
class Employee(models.Model) :
    department = models.ForeignKey(Department ,on_delete=models.CASCADE, null = False, default=1)
    department_name = models.CharField(max_length=50)
    numero_matricule = models.IntegerField(primary_key=True)
    employee_name = models.CharField(max_length=50)
    function   = models.CharField(max_length=50)
    lieu = models.CharField(max_length=30)    
    password = models.CharField(max_length=100)
    
class Pointage(models.Model):
    numero_matricule = models.ForeignKey(Employee, on_delete=models.CASCADE, default=1, unique=True)
    employee_name =  models.CharField(max_length=50, null= True)
    employee_dep_name = models.CharField(max_length=50, null= True)
    pointage_id = models.AutoField(primary_key=True)
    date = models.CharField(max_length=50)
    lieu = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=50)
    
class Pointage_register(models.Model):
    numero_matricule = models.ForeignKey(Employee ,on_delete=models.CASCADE, null = False)
    employee_name =  models.CharField(max_length=50, null= True)
    employee_dep_name = models.CharField(max_length=50, null= True)
    pointage_register_id = models.AutoField(primary_key=True)
    lieu = models.CharField(max_length=30)
    date = models.CharField(max_length=50)
    entry_time = models.CharField(max_length=50)
    exit_time = models.CharField(max_length=50)
    
class Active_connection(models.Model):
    numero_matricule = models.ForeignKey(Employee, on_delete=models.CASCADE, default=1, unique=True, null=True)
    employee_name =  models.CharField(max_length=50, null= True)
    active_connection_id = models.AutoField(primary_key=True)
    date = models.CharField(max_length=50)
    lieu = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=50, null=True)
    
class Connection_register(models.Model):
    numero_matricule = models.ForeignKey(Employee, on_delete=models.CASCADE, default=1)
    employee_name =  models.CharField(max_length=50, null= True)
    connection_register_id = models.AutoField(primary_key=True)
    date = models.CharField(max_length=50)
    lieu = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=50)
    exit_time = models.CharField(max_length=50)