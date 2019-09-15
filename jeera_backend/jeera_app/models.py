from django.db import models

# Create your models here.

class Project(models.Model):
    project_id = models.IntegerField(primary_key=True)
    project_name = models.CharField(max_length=255)
    project_git = models.CharField(max_length=255)

class Story(models.Model):
    story_id = models.IntegerField(primary_key=True)
    story_name = models.CharField(max_length=255)
    story_type = models.CharField(max_length=255)
    story_level = models.CharField(max_length=255)
    story_description = models.CharField(max_length=255)
    story_project = models.ForeignKey(Project,default='',on_delete=models.CASCADE)
    story_weightage = models.IntegerField(default=7)
    story_comment = models.TextField(null=True)
    story_action = models.TextField(null=True)

class Goal(models.Model):
    goal_id = models.IntegerField(primary_key=True)
    goal_name = models.CharField(max_length=255)
    goal_period = models.CharField(max_length=255)
    goal_story = models.ForeignKey(Story,default='',on_delete=models.CASCADE)
    goal_progress = models.IntegerField(default=0)
    goal_weightage = models.IntegerField(default=7)

class User(models.Model):
    user_name = models.CharField(unique=True,max_length=255)
    user_email = models.EmailField(primary_key=True)
    user_password = models.CharField(max_length=255)