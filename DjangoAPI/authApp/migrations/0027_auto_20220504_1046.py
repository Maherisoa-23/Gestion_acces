# Generated by Django 3.2.5 on 2022-05-04 09:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0026_auto_20220504_1043'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pointage',
            name='employee_dep',
        ),
        migrations.RemoveField(
            model_name='pointage_register',
            name='employee_dep',
        ),
    ]
