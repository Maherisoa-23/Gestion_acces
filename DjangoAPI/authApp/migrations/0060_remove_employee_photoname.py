# Generated by Django 3.2.5 on 2022-06-02 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0059_employee_photoname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='photoName',
        ),
    ]