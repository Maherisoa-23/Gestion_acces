# Generated by Django 3.2.5 on 2022-05-25 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VisitApp', '0018_auto_20220525_1021'),
    ]

    operations = [
        migrations.AddField(
            model_name='visitors',
            name='description',
            field=models.CharField(default='none', max_length=200),
        ),
    ]