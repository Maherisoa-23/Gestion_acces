# Generated by Django 3.2.5 on 2022-05-11 07:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0030_alter_pointage_numero_matricule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='active_connection',
            name='numero_matricule',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='authApp.employee'),
            preserve_default=False,
        ),
    ]