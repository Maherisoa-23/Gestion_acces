# Generated by Django 3.2.5 on 2022-05-18 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0036_remove_user_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=100, null=True),
        ),
    ]