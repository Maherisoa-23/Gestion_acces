# Generated by Django 3.2.5 on 2022-05-03 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VisitApp', '0009_auto_20220503_0812'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visits',
            name='entry_time',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='visits_register',
            name='entry_time',
            field=models.CharField(max_length=30),
        ),
    ]
