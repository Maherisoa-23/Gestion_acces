from django.db import models

class User(models.Model) :
    user_name = models.CharField(max_length=100)
    numero_matricule = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=100, null=True)
    
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)
    
class Employee(models.Model) :
    department = models.ForeignKey(Department ,on_delete=models.CASCADE, null = True, default=1)
    department_name = models.CharField(max_length=50)
    numero_matricule = models.IntegerField(primary_key=True)
    employee_name = models.CharField(max_length=100)
    function   = models.CharField(max_length=200)
    pointed_at = models.CharField(max_length=30, default="not pointed") 
    
class Stagiaire(models.Model) :
    stagiaire_id = models.AutoField(primary_key=True)
    stagiaire_name = models.CharField(max_length=100, unique=True)
    department = models.ForeignKey(Department ,on_delete=models.CASCADE, null = True, default=1)
    department_name = models.CharField(max_length=50)
    descritpion   = models.CharField(max_length=200)
    pointed_at = models.CharField(max_length=30, default="not pointed") 
    start_date = models.CharField(max_length=50) 
    end_date = models.CharField(max_length=50) 
    duree = models.CharField(max_length=50) 
    isActif = models.BooleanField(default=True)
    
class Pointage(models.Model):
    numero_matricule = models.OneToOneField(Employee, on_delete=models.CASCADE)
    employee_name =  models.CharField(max_length=50, null= True)
    employee_dep_name = models.CharField(max_length=50, null= True)
    function   = models.CharField(max_length=200)
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
    
