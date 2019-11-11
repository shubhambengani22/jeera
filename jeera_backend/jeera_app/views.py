from django.shortcuts import render
from django.http import JsonResponse
from .models import User,Project,Story,Goal
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
import json

# Create your views here.

@csrf_exempt
def create_users(request):
    try:
        if request.method == 'POST':
            u_name = request.POST['username']
            u_email = request.POST['email']
            u_password = request.POST['password']
            user = User(user_name=u_name,user_email=u_email,user_password=u_password)
            user.save()
            return json_success('successfully created')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)

@csrf_exempt
def login_users(request):
    try:
        if request.method == 'POST':
            u_name = request.POST['username']
            u_password = request.POST['password']
            user = User.objects.filter(user_name = u_name, user_password = u_password)
            print(len(user))
            if len(user) == 0:
                return json_error('Invalid Credentials')
            return json_success('successfully logged in')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)

@csrf_exempt
def create_project(request):
    try:
        if request.method == 'POST':
            p_name = json.loads(request.body)['name']
            p_git = json.loads(request.body)['git']
            project = Project(project_name = p_name,project_git = p_git)
            project.save()
            return json_success('successfully added project')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)

@csrf_exempt
def update_project(request):
    try:
        if request.method == 'POST':
            p_id = json.loads(request.body)['id']
            p_name = json.loads(request.body)['name']
            p_git = json.loads(request.body)['git']
            project = Project.objects.filter(project_id = p_id)
            project.update(project_name = p_name,project_git=p_git)
            #project.save()
            return json_success('successfully updated project')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)

def get_projects(request):
    project_list = []
    for p in Project.objects.all():
        project_list.append({'p_id':p.project_id,'p_name':p.project_name,'p_git':p.project_git})
        print(p)    
    return JsonResponse(project_list,safe=False)

@csrf_exempt
def create_story(request):
    try:
        if request.method == 'POST':
            s_name = json.loads(request.body)['title']
            s_type = json.loads(request.body)['type']
            s_level = json.loads(request.body)['level']
            s_description = json.loads(request.body)['desc']
            s_project_id = json.loads(request.body)['project_id']
            s_project = Project.objects.filter(project_id=s_project_id)[0]
            #s_weightage = request.POST['weightage']
            s_weightage = json.loads(request.body)['weightage']
            s_progress = json.loads(request.body)['progress']
            s_comment = ''
            s_action=''
            story = Story(story_name=s_name,story_type=s_type,story_level=s_level,story_description=s_description,story_project=s_project,story_weightage=s_weightage,story_comment=s_comment,story_action=s_action,story_progress=s_progress)
            story.save()
            return json_success('story successfully added')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        #print(request.POST.get('type'))
        if 'type' in request.POST:
            print(True)
        else:
            print(request.POST)
        return json_error(e)

@csrf_exempt
def update_story(request):
    try:
        if request.method == 'POST':
            s_id = json.loads(request.body)['id']
            s_name = json.loads(request.body)['title']
            s_type = json.loads(request.body)['type']
            s_level = json.loads(request.body)['level']
            s_description = json.loads(request.body)['desc']
            s_project_id = json.loads(request.body)['project_id']
            s_project = Project.objects.filter(project_id=s_project_id)[0]
            #s_weightage = request.POST['weightage']
            s_weightage = json.loads(request.body)['weightage']
            s_progress = json.loads(request.body)['progress']
            s_comment = ''
            s_action=''
            story = Story.objects.filter(story_id=s_id)
            story.update(story_name=s_name,story_type=s_type,story_level=s_level,story_description=s_description,story_project=s_project,story_weightage=s_weightage,story_comment=s_comment,story_action=s_action,story_progress=s_progress)
            #story.save()
            return json_success('story successfully updated')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)

def get_stories(request):
    story_list = []
    for s in Story.objects.all():
        story_list.append({'s_id':s.story_id,'s_name':s.story_name,'s_type':s.story_type,'s_level':s.story_level,'s_description':s.story_description,'s_project':s.story_project_id,'s_weightage':s.story_weightage,'s_comment':s.story_comment,'s_action':s.story_action,'s_progress':s.story_progress})
    return JsonResponse(story_list,safe=False)

@csrf_exempt
def create_goal(request):
    try:
        if request.method == 'POST':
            g_id = json.loads(request.body)['g_id']
            g_name = json.loads(request.body)['title']
            goal_desc = json.loads(request.body)['desc']
            #g_period = json.loads(request.body)['period']
            g_period = 0
            s_id = json.loads(request.body)['s_id']
            goal_completed = json.loads(request.body)['goal_completed']
            g_story = Story.objects.filter(story_id=s_id)[0]
            g_weightage = json.loads(request.body)['weightage']
            goal = Goal(goal_id=g_id, goal_name=g_name,goal_period=g_period,goal_story=g_story,goal_weightage=g_weightage,goal_desc=goal_desc, goal_completed=goal_completed)
            goal.save()
            return json_success('successfully added goal')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)

@csrf_exempt
def update_goal(request):
    try:
        if request.method == 'POST':
            g_id = json.loads(request.body)['g_id']
            g_name = json.loads(request.body)['title']
            goal_desc = json.loads(request.body)['desc']
            #g_period = json.loads(request.body)['period']
            g_period = 0
            s_id = json.loads(request.body)['s_id']
            g_story = Story.objects.filter(story_id=s_id)[0]
            g_weightage = json.loads(request.body)['weightage']
            goal_completed = json.loads(request.body)['goal_completed']
            goal = Goal.objects.filter(goal_id=g_id)
            goal.update(goal_id=g_id, goal_name=g_name,goal_period=g_period,goal_story=g_story,goal_weightage=g_weightage,goal_desc=goal_desc, goal_completed=goal_completed)
            #goal.save()
            return json_success('successfully updated goal')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)

def get_goals(request):
    goals_list = []
    for g in Goal.objects.all():
        goals_list.append({'g_id':g.goal_id,'g_name':g.goal_name,'g_period':g.goal_period,'g_story':g.goal_story.story_id,'g_weightage':g.goal_weightage, 'goal_desc':g.goal_desc, 'goal_completed': g.goal_completed})
    return JsonResponse(goals_list,safe=False)

"""
@csrf_exempt
def (request):
    try:
        if request.method == 'POST':
            return json_success('')
        else:
            return json_error('Invalid Request')
    except Exception as e:
        return json_error(e)
"""

def json_success(e):
    return JsonResponse({'result':'success','status':str(e)})

def json_error(e):
    return JsonResponse({'result':'failed','error':str(e)})
