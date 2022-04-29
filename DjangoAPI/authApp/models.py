from django.db import models

class User(models.Model) :
    user_id = models.AutoField(primary_key=True)
    user_first_name = models.CharField(max_length=50)
    user_last_name  = models.CharField(max_length=50)
    numero_matricule = models.IntegerField()
    password = models.CharField(max_length=100)
    
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)
    
class Employee(models.Model) :
    department = models.ForeignKey(Department ,on_delete=models.CASCADE, null = False, default=1)
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.CharField(max_length=50)
    function   = models.CharField(max_length=50)
    lieu = models.CharField(max_length=30)
    numero_matricule = models.IntegerField()
    password = models.CharField(max_length=100)
    
class Pointage(models.Model):
    employee = models.ForeignKey(Employee ,on_delete=models.CASCADE, null = False)
    employee_name =  models.CharField(max_length=50, null= True)
    pointage_id = models.AutoField(primary_key=True)
    date = models.CharField(max_length=50)
    lieu = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=50)
    
class Pointage_register(models.Model):
    employee = models.ForeignKey(Employee ,on_delete=models.CASCADE, null = False)
    pointage_id = models.AutoField(primary_key=True)
    lieu = models.CharField(max_length=30)
    date = models.CharField(max_length=50)
    entry_time = models.CharField(max_length=50)
    exit_time = models.CharField(max_length=50)