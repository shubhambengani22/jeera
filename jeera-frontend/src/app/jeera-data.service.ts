import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Story } from './stories';
import { all_icons } from './icons';
import { Project } from './projects';

@Injectable({
  providedIn: 'root'
})
export class JeeraDataService {

  host:string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  createUser(userData){
    return this.http.post<any>(this.host+"/create_users/",userData,{'responseType':'json'});
  }

  loginUser(userData){
    return this.http.post<any>(this.host+"/login_users/",userData,{'responseType':'json'});
  }

  createProject(projectData){
    return this.http.post<any>(this.host+"/create_project/",projectData,{'responseType':'json'});
  }

  updateProject(projectData){
    return this.http.post<any>(this.host+"/update_project/",projectData,{'responseType':'json'});
  }

  getProjects():Project[]{
    var projects: Project[] = [];
    this.http.get<any>(this.host+"/get_projects/",{'responseType':'json'}).subscribe(data => {
      data.forEach(element => {
        console.log(element);
        var project =  new Project(element.p_id,element.p_name,element.p_git);
        console.log(project);
        projects.push(project);
      });
    });
    return projects;
  }

  createStory(storyData){
    return this.http.post<any>(this.host+"/create_story/",storyData,{'responseType':'json'});
  }

  updateStory(storyData){
    return this.http.post<any>(this.host+"/update_story/",storyData,{'responseType':'json'});
  }

  getStories():Story[]{
    var stories: Story[] = [];
    this.http.get<any>(this.host+"/get_stories/",{'responseType':'json'}).subscribe(data => {
      data.forEach(element => {
        console.log(element);
        var story =  new Story(element.s_id,element.s_name,element.s_description,element.s_type, element.s_level,all_icons[element.s_level.toLowerCase()]);
        console.log(story);
        stories.push(story);
      });
    });
    return stories;
  }

  createGoal(goalData){
    return this.http.post<any>(this.host+"/create_goal/",goalData,{'responseType':'json'});
  }

  updateGoal(goalData){
    return this.http.post<any>(this.host+"/update_goal/",goalData,{'responseType':'json'});
  }

  getGoals(){
    return this.http.get<any>(this.host+"/get_goals/",{'responseType':'json'});
  }

  // private handleError<T> (operation = 'operation', result? :T){
  //   return (error:any) : Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }

}
