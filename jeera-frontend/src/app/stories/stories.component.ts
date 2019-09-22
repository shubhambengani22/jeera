import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { Story } from '../stories';
import { Router } from '@angular/router';
import { all_stories } from '../dummy_stories';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})

export class StoriesComponent implements OnInit {

  stories = all_stories;
  
  ngOnInit(): void {
    console.log(this.stories);
  }

  

  colors = {
    'enhancement': '#FFDD05',
    'bug': '#9B1C31',
    'development': '#006400'
  }
  // enhancement_color = '#FFDD05';
  // bug_color = '#9B1C31';
  // dev_color = '#006400';

  borderLeft(color){
    return {
      'border-left-color': this.colors[color],
      'border-left-width': '10px',
      'border-left-style': 'solid'
    }
  } 

  constructor(private router: Router, private storage: SessionStorageService) { }

  goToStory(story_id, story_title, story_desc, story_type, story_level){
    this.storage.set('story_id', story_id);
    this.storage.set('story_title', story_title);
    this.storage.set('story_desc', story_desc);
    this.storage.set('story_type', story_type);
    this.storage.set('story_level', story_level);
    //console.log(story_id);
    this.router.navigate(['/story']);
  }

  searchStory(story){
    console.log(story)
  }

}
