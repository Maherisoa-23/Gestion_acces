from pickle import TRUE
from django.db import models

# Create your models here.

class Visits(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50)
    motif = models.CharField(max_length=200)
    CIN = models.IntegerField()
    lieu = models.CharField(max_length=30, null=True)
    date_of_entry = models.CharField(max_length=100)
    
class Visits_register(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50)
    motif = models.CharField(max_length=200)
    CIN = models.IntegerField()
    lieu = models.CharField(max_length=30, null=True)
    date_of_entry = models.CharField(max_length=100)
    exit_time = models.CharField(max_length=100)
    
