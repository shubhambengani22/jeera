import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { JeeraDataService } from '../jeera-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Story } from '../stories';

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

  constructor(private router: Router, private snackBar: MatSnackBar, private storage: SessionStorageService, @Inject(DOCUMENT) document, public jeeraservice: JeeraDataService) { }

  ngOnInit() {
    this.project_id = this.storage.get("project_id");
    this.project_title = this.storage.get("project_title");
    this.project_git = this.storage.get("project_git");
    this.stories = this.jeeraservice.getStories();
    if(this.stories){
      this.loadStory = true;
      console.log(this.stories)
    }
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
    this.jeeraservice.createProject(project).subscribe((res)=>{
      console.log(res)
      this.openSnackBar(res.status)
    })
  }

  goToStory(story_id, story_title, story_desc, story_type, story_level, project_id, project_title){
    this.storage.set('story_id', story_id);
    this.storage.set('story_title', story_title);
    this.storage.set('story_desc', story_desc);
    this.storage.set('story_type', story_type);
    this.storage.set('story_level', story_level);
    this.storage.set('project_id', project_id);
    this.storage.set('project_title', project_title);
    //console.log(story_id);
    this.router.navigate(['/story']);
  }

  goBack(){
    this.router.navigate(['/all_projects'])
  }

}
