# Generated by Django 3.2.5 on 2022-05-24 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0043_auto_20220524_0954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='function',
            field=models.CharField(max_length=200),
        ),
    ]