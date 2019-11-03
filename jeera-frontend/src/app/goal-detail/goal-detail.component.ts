import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { all_stories } from '../dummy_stories';
import { Goals } from '../goals';
import { JeeraDataService } from '../jeera-data.service';
import { MatSnackBar } from '@angular/material';

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
  goalArray: any = [];
  goal: Goals;
  progress: number;
  goalExists: boolean = false;

  constructor(private snackBar: MatSnackBar, private router: Router, private storage: SessionStorageService, public jeeradataservice: JeeraDataService) { }

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
    this.progress = 0;
    this.jeeradataservice.getGoals().subscribe((goals)=>{
      console.log(goals)
      this.goalArray = goals;
    })    
  }

  addToGoals(goal_id, goal_title, goal_desc, goal_story, goal_weightage, goal_progress){
    this.goal = {
      g_id: goal_id,
      s_id: this.story_id,
      title: goal_title,
      desc: goal_desc,
      story: goal_story,
      weightage: goal_weightage,
      progress: goal_progress
    }

    if(this.goalArray){
      for(let i=0; i<this.goalArray.length; i++){
        var g = this.goalArray[i];
        if(g.g_id == goal_id){
          this.goalExists = true;
          break;
        }
      }
    }
    if(this.goalExists){
      if(confirm("Are you sure about updating the goal?")){
        this.jeeradataservice.updateGoal(this.goal).subscribe((res)=>{
          console.log(res)
          this.openSnackBar(res.status);
        },
        (error)=>{
          console.log(error);
        })
      }
    }
    else{
      this.jeeradataservice.createGoal(this.goal).subscribe((res)=>{
      console.log(res)
      this.openSnackBar(res.status)
      },
      (error)=>{
        console.log(error)
      })
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }

  goBack(goalsArray){
    this.storage.set("goalArray", goalsArray);
    this.router.navigate(["/story"])
  }

}
