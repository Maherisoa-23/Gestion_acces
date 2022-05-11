# Generated by Django 3.2.5 on 2022-05-09 13:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0027_auto_20220504_1046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='active_connection',
            name='numero_matricule',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='authApp.employee', unique=True),
        ),
        migrations.AlterField(
            model_name='pointage',
            name='numero_matricule',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='authApp.employee', unique=True),
        ),
    ]