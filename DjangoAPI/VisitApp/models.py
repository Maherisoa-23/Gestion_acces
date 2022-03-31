from datetime import datetime
from django.db import models

# Create your models here.

class Visits(models.Model) :
    visit_id = models.AutoField(primary_key=True)
    visitor_first_name = models.CharField(max_length=50)
    visitor_last_name = models.CharField(max_length=50)
    motif = models.CharField(max_length=200)
    CIN = models.IntegerField()
    date_of_entry = models.DateTimeField(default=datetime.now, blank=True)
    exit_time = models.DateTimeField(default=datetime.now, blank=True, null=True)
    
