import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { JeeraDataService } from '../jeera-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Story } from '../stories';
import { Goals } from '../goals';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project_id: number;
  project_title: string;
  project_git: string;
  stories: Story[];
  loadStory: boolean = false;
  projects: any = [];
  projectExists: boolean = false;
  progress: number = 0;
  all_stories = [];
  total_weightage: number = 0;
  goals = [];
  project_stories = []
  project_goals = []
  project_progress: number = 0;

  constructor(private router: Router, private snackBar: MatSnackBar, private storage: SessionStorageService, @Inject(DOCUMENT) document, public jeeraservice: JeeraDataService) { }

  ngOnInit() {
    this.project_id = this.storage.get("project_id");
    this.project_title = this.storage.get("project_title");
    this.project_git = this.storage.get("project_git");
    this.stories = this.jeeraservice.getStories();
    if(this.stories){
      this.loadStory = true;
    }
    this.projects = this.jeeraservice.getProjects();
    setTimeout(()=>{
      for(let i=0; i<this.stories.length; i++){
        if(this.stories[i].project_id == this.project_id){
          this.project_progress += this.stories[i].weightage*this.stories[i].progress
          this.total_weightage += this.stories[i].weightage
        }
      }
      this.progress = (this.project_progress/this.total_weightage)
      console.log(this.progress)
    }
    , 500)
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }

  addToProjects(id, title, git){
    var project = {
      id: id,
      name: title,
      git: git
    }
    if(this.projects){
      for(let i=0; i<this.projects.length; i++){
        var p = this.projects[i];
        if(p.id == id){
          this.projectExists = true;
          break;
        }
      }
    }
    if(this.projectExists){
      if(confirm("Are you sure about updating the project?")){
        this.jeeraservice.updateProject(project).subscribe((res)=>{
          console.log(res)
          this.openSnackBar(res.status);
        },
        (error)=>{
          console.log(error)
        })
      }
    }
    else{
      this.jeeraservice.createProject(project).subscribe((res)=>{
        console.log(res)
        this.openSnackBar(res.status)
      })
    }
  }

  goToStory(story_id, story_title, story_desc, story_type, story_level, project_id){
    this.storage.set('story_id', story_id);
    this.storage.set('story_title', story_title);
    this.storage.set('story_desc', story_desc);
    this.storage.set('story_type', story_type);
    this.storage.set('story_level', story_level);
    this.storage.set('project_id', project_id);
    //console.log(story_id);
    this.router.navigate(['/story']);
  }

  goBack(){
    this.router.navigate(['/all_projects'])
  }

}
