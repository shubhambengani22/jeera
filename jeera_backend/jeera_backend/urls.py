"""jeera_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from jeera_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_users/',views.create_users),
    path('login_users/',views.login_users),
    path('create_project/',views.create_project),
    path('update_project/',views.update_project),
    path('get_projects/',views.get_projects),
    path('create_story/',views.create_story),
    path('update_story/',views.update_story),
    path('get_stories/',views.get_stories),
    path('create_goal/',views.create_goal),
    path('update_goal/',views.update_goal),
    path('get_goals/',views.get_goals),

]
