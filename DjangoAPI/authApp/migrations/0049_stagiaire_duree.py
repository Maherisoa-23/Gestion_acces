# Generated by Django 3.2.5 on 2022-05-26 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0048_stagiaire'),
    ]

    operations = [
        migrations.AddField(
            model_name='stagiaire',
            name='duree',
            field=models.CharField(default='1 mois', max_length=50),
            preserve_default=False,
        ),
    ]