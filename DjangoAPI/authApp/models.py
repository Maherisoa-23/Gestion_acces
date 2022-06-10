from django.db import models

class User(models.Model) :
    user_name = models.CharField(max_length=100)
    numero_matricule = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=100, null=True)
    
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=100)
    department_short_name = models.CharField(max_length=10)
    
class Employee(models.Model) :
    department_name = models.CharField(max_length=50)
    numero_matricule = models.IntegerField(primary_key=True)
    employee_name = models.CharField(max_length=100)
    function   = models.CharField(max_length=200)
    pointed_at = models.CharField(max_length=30, default="Pas encore actif") 
    photoName = models.CharField(max_length=30, default="anonymous.png")
 
class Stagiaire(models.Model) :
    stagiaire_id = models.AutoField(primary_key=True)
    stagiaire_name = models.CharField(max_length=100, unique=True)
    department_name = models.CharField(max_length=50)
    description   = models.CharField(max_length=200)
    pointed_at = models.CharField(max_length=30, default="Pas encore actif") 
    start_date = models.CharField(max_length=50) 
    end_date = models.CharField(max_length=50)
    function   = models.CharField(max_length=50, default="stagiaire") 
    photoName = models.CharField(max_length=30, default="anonymous.png")
 
class Vehicule(models.Model) :
    vehicule_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)
    numero_matricule = models.CharField(max_length=20)
    vehicule_name = models.CharField(max_length=100)
    vehicule_marque = models.CharField(max_length=100)
    pointed_at = models.CharField(max_length=30, default="Pas encore actif") 
    photoName = models.CharField(max_length=30, default="anonymous.png")
    
class Pointage(models.Model):
    pointage_id = models.AutoField(primary_key=True)
    numero_matricule = models.CharField(max_length=30, null=True)
    employee_name =  models.CharField(max_length=50, null= True, unique=True)
    employee_dep_name = models.CharField(max_length=50, null= True)
    function   = models.CharField(max_length=200, null=True)
    date = models.CharField(max_length=50)
    lieu = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=50) 
    #pour les stagiaires   
    start_date = models.CharField(max_length=50, null=True) 
    end_date = models.CharField(max_length=50, null=True)
    
class Pointage_register(models.Model):
    numero_matricule = models.CharField(max_length=30,null = True)
    employee_name =  models.CharField(max_length=50, null= True)
    employee_dep_name = models.CharField(max_length=50, null= True)
    function   = models.CharField(max_length=200)
    pointage_register_id = models.AutoField(primary_key=True)
    lieu = models.CharField(max_length=30)
    date = models.CharField(max_length=50)
    entry_time = models.CharField(max_length=50)
    exit_time = models.CharField(max_length=50)
    
