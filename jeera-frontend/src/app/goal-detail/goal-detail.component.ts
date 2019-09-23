import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { all_stories } from '../dummy_stories';
import { Goals } from '../goals';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit {

  goal_id: number;
  goal_title: string;
  goal_desc: string;
  goal_story: string;
  goal_weightage: number;
  goal_progress: number;
  story_id: number;
  story_title: string;
  stories = all_stories;
  goalArray: Goals[] = [];
  goal: Goals;

  constructor(private router: Router, private storage: SessionStorageService) { }

  ngOnInit() {
    this.goal_id = this.storage.get("id");
    this.goal_title = this.storage.get("goal_title");
    this.goal_desc = this.storage.get("goal_desc");
    this.goal_story = this.storage.get("goal_story");
    this.goal_weightage = this.storage.get("goal_weightage");
    this.goal_progress = this.storage.get("goal_progress");
    this.story_id = this.storage.get("story_id");
    this.story_title = this.storage.get("story_title");
    if(this.storage.get("goalArray") != null){
      this.goalArray = this.storage.get("goalArray");
    }
    //console.log(this.goalArray)
  }

  addToGoals(goal_id, goal_title, goal_desc, goal_story, goal_weightage, goal_progress){
    this.goal = {
      id: goal_id,
      title: goal_title,
      desc: goal_desc,
      story: goal_story,
      weightage: goal_weightage,
      progress: goal_progress
    }
    console.log(this.goalArray)
    this.goalArray.push(this.goal);
    console.log(this.goalArray)
    //alert("Goal added : "+this.goal)
  }

  goBack(goalsArray){
    this.storage.set("goalArray", goalsArray);
    this.router.navigate(["/story"])
  }

}
