# Generated by Django 3.2.5 on 2022-04-29 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0008_auto_20220429_1309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='lieu',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='pointage',
            name='lieu',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='pointage_register',
            name='lieu',
            field=models.CharField(max_length=30),
        ),
    ]