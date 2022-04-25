from django.db import models

class User(models.Model) :
    user_id = models.AutoField(primary_key=True)
    user_first_name = models.CharField(max_length=50)
    user_last_name    = models.CharField(max_length=50)
    numero_matricule = models.IntegerField()
    password = models.CharField(max_length=100)