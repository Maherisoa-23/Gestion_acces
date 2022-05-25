from django.db import models

# Create your models here.
class Visitors(models.Model) :
    visitor_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50)
    CIN = models.IntegerField(null=True)
    comment = models.CharField(max_length=200, null=True) #Au cas ou le visiteur n'as pas de CIN

<<<<<<< HEAD
class Visits(models.Model) :
    visitor_name = models.CharField(max_length=50)
    motif = models.CharField(max_length=200)
    CIN = models.IntegerField(primary_key=True)
    lieu = models.CharField(max_length=30, null=True)
    date = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=30)
    
class Visits_register(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50)
=======
class Visits_actif(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50)
    motif = models.CharField(max_length=300)
    CIN = models.IntegerField(null=True)
    comment = models.CharField(max_length=200, null = True) #Au cas ou le visiteur n'as pas de CIN
    lieu = models.CharField(max_length=30, null=True)
    date = models.CharField(max_length=30)
    entry_time = models.CharField(max_length=30)
    
class Visits_register(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_name = models.CharField(max_length=50)
>>>>>>> dev_test_prod
    motif = models.CharField(max_length=200)
    CIN = models.IntegerField()
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