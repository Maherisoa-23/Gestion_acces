# Generated by Django 3.2.5 on 2022-05-19 10:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0039_remove_employee_isactive'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='connection_register',
            name='numero_matricule',
        ),
        migrations.DeleteModel(
            name='Active_connection',
        ),
        migrations.DeleteModel(
            name='Connection_register',
        ),
    ]
