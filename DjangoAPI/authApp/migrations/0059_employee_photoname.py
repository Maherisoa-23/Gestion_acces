# Generated by Django 3.2.5 on 2022-06-01 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0058_rename_descritpion_stagiaire_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='photoName',
            field=models.CharField(default='Tojo.png', max_length=30),
        ),
    ]
