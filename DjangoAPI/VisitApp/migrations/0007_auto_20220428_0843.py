# Generated by Django 3.2.5 on 2022-04-28 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VisitApp', '0006_auto_20220427_1447'),
    ]

    operations = [
        migrations.AddField(
            model_name='visits',
            name='lieu',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='visits_register',
            name='lieu',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
