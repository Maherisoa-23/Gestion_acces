# Generated by Django 3.2.5 on 2022-04-28 10:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('VisitApp', '0007_auto_20220428_0843'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='visits',
            name='exit_time',
        ),
    ]
