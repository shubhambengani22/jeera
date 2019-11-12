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
  story_weightage: number = 0;
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
  s: any = [];
  storyExists: boolean = false;
  all_goals = [];
  total_weightage: number = 0;
  project_stories: Story[] = [];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  ngOnInit() {
    this.s = this.jeeradataservice.getStories();
    this.story_id = this.storage.get("story_id");
    this.story_title = this.storage.get("story_title");
    this.story_desc = this.storage.get("story_desc");
    this.story_type = this.storage.get("story_type");
    this.story_level = this.storage.get("story_level");
    this.project_id = this.storage.get("project_id");
    this.story_weightage = this.storage.get("story_weightage");
    this.goal_story = this.story_id+" - "+this.story_title
    //console.log(this.story_id, this.story_title, this.story_type.toLowerCase(), this.story_level.toLowerCase());
    this.setSelectedType(document.getElementById('story-type'), this.story_type.toLowerCase());
    this.setSelectedLevel(document.getElementById('story-level'), this.story_level.toLowerCase());
    this.goals = this.storage.get("goalArray");
    this.jeeradataservice.getGoals().subscribe((res)=>{
      if(res){
        this.goalArray = res;
        this.loadGoal = true;
        for(let i=0; i<this.goalArray.length; i++){
          if(this.goalArray[i].g_story == this.story_id){
            this.all_goals.push(this.goalArray[i])
            this.total_weightage += this.goalArray[i].g_weightage
          }
        }
        for(let i=0; i<this.all_goals.length; i++){
          // if(this.total_weightage <= 100){
          //   this.progress += this.all_goals[i].g_weightage*this.all_goals[i].goal_completed
          // }
          var weightage = (this.all_goals[i].g_weightage / this.total_weightage)*100
          this.progress += weightage*this.all_goals[i].goal_completed
        }
      }
    },
    (error)=>{
      console.log(error);
    })
    setTimeout(()=>this.addToStory(this.story_id, this.story_title, this.story_desc, this.story_type, this.story_level, this.project_id, this.story_weightage, false), 500)
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }

  setSelectedType(name, value){
    for ( var i = 0; i < name.options.length; i++ ) {
      if ( name.options[i].text.toLowerCase() == value ) {
          name.options[i].selected = true;
          return;
      }
    }
  }

  setSelectedLevel(name, value){
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

  addToStory(s_id, s_title, s_desc, s_type, s_level, project_id, weightage, callAlert){
    this.story = {
      id: s_id,
      title: s_title,
      desc: s_desc,
      type: s_type,
      level: s_level,
      level_icon: s_level.toLowerCase(),
      project_id: project_id,
      weightage: weightage,
      progress: this.progress
    }
    if(this.s){
      for(let i=0; i<this.s.length; i++){
        var temp_story = this.s[i];
        if(temp_story.id == s_id){
          this.storyExists = true;
          break;
        }
      }
    }
    if(this.storyExists){
      if(callAlert)
      {
        confirm("Are you sure about updating the story?")
      }
      this.jeeradataservice.updateStory(this.story).subscribe((res)=>{
        console.log(res)
        this.openSnackBar(res.status);
      },
      (error)=>{
        console.log(error)
      })
    }
    else{
      this.dataService.createStory(this.story).subscribe(res=>{
        console.log(res);
        this.openSnackBar(res.status)
      })
    }
    
  }

  goToGoal(id, name, desc, story, weightage, progress, completed){
    this.storage.set("id", id);
    this.storage.set("goal_title", name);
    this.storage.set("goal_desc", desc);
    this.storage.set("goal_story", story);
    this.storage.set("goal_weightage", weightage);
    this.storage.set("goal_progress", progress);
    this.storage.set("goal_completed", completed);
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
