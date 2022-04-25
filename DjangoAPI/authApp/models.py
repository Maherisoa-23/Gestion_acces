from django.db import models

class User(models.Model) :
    user_id = models.AutoField(primary_key=True)
    user_first_name = models.CharField(max_length=50)
    user_last_name    = models.CharField(max_length=50)
    numero_matricule = models.IntegerField()
    password = models.CharField(max_length=100)
    
class Employee(models.Model) :
    employee_id = models.AutoField(primary_key=True)
    employee_first_name = models.CharField(max_length=50)
    employee_last_name    = models.CharField(max_length=50)
    numero_matricule = models.IntegerField()
    department = models.CharField(max_length=50)
    password = models.CharField(max_length=100)