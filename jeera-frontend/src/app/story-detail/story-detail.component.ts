import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Router } from '@angular/router';
import { all_stories } from '../dummy_stories';
import { Goals } from '../goals';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {

  goalArray = [];

  constructor(private storage: SessionStorageService, @Inject(DOCUMENT) document, private router: Router) { }

  story_id: number;
  story_title: string;
  story_desc: string;
  story_type: string;
  story_level: string;
  public isCollapsed = false;
  stories = all_stories;
  goals: Goals[] = []
  goal_story: string;

  ngOnInit() {
    this.story_id = this.storage.get("story_id");
    this.story_title = this.storage.get("story_title");
    this.story_desc = this.storage.get("story_desc");
    this.story_type = this.storage.get("story_type");
    this.story_level = this.storage.get("story_level");
    this.goal_story = this.story_id+" - "+this.story_title
    //console.log(this.story_id, this.story_title, this.story_type.toLowerCase(), this.story_level.toLowerCase());
    this.setSelectedType(document.getElementById('story-type'), this.story_type.toLowerCase());
    this.setSelectedLevel(document.getElementById('story-level'), this.story_level.toLowerCase());
    this.goals = this.storage.get("goalArray");
    console.log(this.goals);
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

}
