# Generated by Django 3.2.5 on 2022-05-11 07:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0032_alter_active_connection_numero_matricule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='active_connection',
            name='numero_matricule',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='authApp.employee'),
        ),
    ]
