# Generated by Django 3.2.5 on 2022-06-03 10:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0061_auto_20220602_1528'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stagiaire',
            name='duree',
        ),
        migrations.RemoveField(
            model_name='stagiaire',
            name='isActif',
        ),
    ]