# Generated by Django 3.2.5 on 2022-05-19 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VisitApp', '0013_lieu_isactive'),
    ]

    operations = [
        migrations.AddField(
            model_name='lieu',
            name='entry_time',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
