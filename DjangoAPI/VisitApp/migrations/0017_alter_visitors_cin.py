# Generated by Django 3.2.5 on 2022-05-25 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('VisitApp', '0016_auto_20220525_0948'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitors',
            name='CIN',
            field=models.CharField(max_length=12, null=True),
        ),
    ]