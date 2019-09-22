import { Component, OnInit } from '@angular/core';
import { Project } from '../projects';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [
    {
      id: 1,
      name: 'Project1',
      git: 'https://jeera/project1.git'
    },
    {
      id: 2,
      name: 'Project2',
      git: 'https://jeera/project2.git'
    },
  ];

  constructor(private router: Router, private storage: SessionStorageService) { }

  ngOnInit() {
  }

  searchProject(project){
    console.log(project)
  }

  goToProject(project_id, project_title, project_git){
    this.storage.set('project_id', project_id);
    this.storage.set('project_title', project_title);
    this.storage.set('project_git', project_git);
    this.router.navigate(['/project']);
  }

}
