# Generated by Django 3.2.5 on 2022-05-27 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0053_auto_20220527_0910'),
    ]

    operations = [
        migrations.AddField(
            model_name='department',
            name='department_short_name',
            field=models.CharField(default='DSI', max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='department',
            name='department_name',
            field=models.CharField(max_length=100),
        ),
    ]