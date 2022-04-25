# Generated by Django 4.0.3 on 2022-04-25 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0002_alter_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('employee_id', models.AutoField(primary_key=True, serialize=False)),
                ('employee_first_name', models.CharField(max_length=50)),
                ('employee_name', models.CharField(max_length=50)),
                ('numero_matricule', models.IntegerField()),
                ('department', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=100)),
            ],
        ),
    ]
