# Generated by Django 3.2.5 on 2022-04-06 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_first_name', models.CharField(max_length=50)),
                ('user_last_name', models.CharField(max_length=50)),
                ('numero_matricule', models.IntegerField()),
                ('password', models.CharField(max_length=20)),
            ],
        ),
    ]