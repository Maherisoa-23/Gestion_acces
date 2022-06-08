from django.db import models

# Create your models here.
class Visitors(models.Model) :
    visitor_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50, unique=True)
    CIN = models.CharField(null=True, max_length=12)
    comment = models.CharField(max_length=200, null=True) #Au cas ou le visiteur n'as pas de CIN
    description = models.CharField(max_length=200, default="none")

class Visits_actif(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50, unique=True)
    motif = models.CharField(max_length=300)
    CIN = models.CharField(null=True, max_length=12)
    comment = models.CharField(max_length=200, null = True) #Au cas ou le visiteur n'as pas de CIN
    lieu = models.CharField(max_length=30, null=True)
    date = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=30)
    
class Visits_register(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50)
    motif = models.CharField(max_length=200)
    CIN = models.CharField(null=True, max_length=12)
    lieu = models.CharField(max_length=30, null=True)
    date = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=30)
    exit_time = models.CharField(max_length=100)
    
class Lieu(models.Model):
    lieu_id = models.AutoField(primary_key=True)
    lieu_name = models.CharField(max_length=50)
    total_employee = models.IntegerField(default=100)
    isActive = models.BooleanField(default=False)
    entry_time = models.CharField(max_length=30, null=True)