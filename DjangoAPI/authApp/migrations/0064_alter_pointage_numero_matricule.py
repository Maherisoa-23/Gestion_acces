# Generated by Django 3.2.5 on 2022-06-09 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0063_remove_employee_department'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pointage',
            name='numero_matricule',
            field=models.CharField(max_length=30, null=True),
        ),
    ]