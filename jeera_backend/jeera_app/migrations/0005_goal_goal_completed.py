# Generated by Django 2.2.6 on 2019-11-07 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jeera_app', '0004_remove_goal_goal_progress'),
    ]

    operations = [
        migrations.AddField(
            model_name='goal',
            name='goal_completed',
            field=models.IntegerField(default=0),
        ),
    ]
