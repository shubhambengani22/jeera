import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router } from '@angular/router';
import { all_stories } from '../dummy_stories';
import { Goals } from '../goals';
import { Story } from '../stories'
import { JeeraDataService } from '../jeera-data.service';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {

  goalArray = [];
  loadGoal: boolean = false;
  //storyArray = []

  constructor(private snackBar: MatSnackBar, private storage: SessionStorageService, public jeeradataservice: JeeraDataService, @Inject(DOCUMENT) document, private router: Router, private dataService: JeeraDataService) { }

  story_id: number;
  story_title: string;
  story_desc: string;
  story_type: string;
  story_level: string;
  public isCollapsed = false;
  stories = all_stories;
  goals: Goals[] = []
  goal_story: string;
  state: string
  story: Story
  storyArray: Story[] = []
  project_id: number
  project_title: string
  progress: number = 0

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  ngOnInit() {
    this.story_id = this.storage.get("story_id");
    this.story_title = this.storage.get("story_title");
    this.story_desc = this.storage.get("story_desc");
    this.story_type = this.storage.get("story_type");
    this.story_level = this.storage.get("story_level");
    this.project_id = this.storage.get("project_id")
    this.goal_story = this.story_id+" - "+this.story_title
    //console.log(this.story_id, this.story_title, this.story_type.toLowerCase(), this.story_level.toLowerCase());
    this.setSelectedType(document.getElementById('story-type'), this.story_type.toLowerCase());
    this.setSelectedLevel(document.getElementById('story-level'), this.story_level.toLowerCase());
    this.goals = this.storage.get("goalArray");
    console.log(this.loadGoal);
    this.jeeradataservice.getGoals().subscribe((res)=>{
      console.log(res);
      if(res){
        this.goalArray = res;
        this.loadGoal = true;
        console.log(this.loadGoal)
      }
    },
    (error)=>{
      console.log(error);
    })

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }

  setSelectedType(name, value){
    console.log(value);
    for ( var i = 0; i < name.options.length; i++ ) {
      if ( name.options[i].text.toLowerCase() == value ) {
          name.options[i].selected = true;
          return;
      }
    }
  }

  setSelectedLevel(name, value){
    console.log(value);
    for ( var i = 0; i < name.options.length; i++ ) {
      if ( name.options[i].text.toLowerCase() == value ) {
          name.options[i].selected = true;
          return;
      }
    }
  }

  addNewGoal(story_id, story_title){
    this.storage.set('id', 1);
    this.storage.set('goal_title', "");
    this.storage.set('goal_desc', "");
    this.storage.set('goal_story', "");
    this.storage.set('goal_weightage', 1);
    this.storage.set('goal_progress', 1);
    this.storage.set('story_id', story_id);
    this.storage.set('story_title', story_title);
    this.storage.set('goalArray', this.goals);
    this.router.navigate(['/goal']);
  }

  addToStory(s_id, s_title, s_desc, s_type, s_level, project_id){
    this.story = {
      id: s_id,
      title: s_title,
      desc: s_desc,
      type: s_type,
      level: s_level,
      level_icon: s_level.toLowerCase(),
      project_id: project_id
    }
    //console.log(this.storyArray)
    this.storyArray.push(this.story);
    //console.log(this.story)
    this.dataService.createStory(this.story).subscribe(res=>{
      console.log(res);
      this.openSnackBar(res.status)
    })
    //alert("Goal added : "+this.goal)
    //console.log(temp);
    
  }

  goToGoal(id, name, desc, story, weightage, progress){
    this.storage.set("id", id);
    this.storage.set("goal_title", name);
    this.storage.set("goal_desc", desc);
    this.storage.set("goal_story", story);
    this.storage.set("goal_weightage", weightage);
    this.storage.set("goal_progress", progress);
    this.router.navigate(['/goal'])
  }

  goBack(storyArray){
    this.storage.set("storyArray", storyArray);
    this.router.navigate(["/all_stories"])
  }

  markCompleted($e){
    console.log($e)
  }

}
