# Generated by Django 3.2.5 on 2022-05-24 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0044_alter_employee_function'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='function',
            field=models.TextField(max_length=200),
        ),
    ]
