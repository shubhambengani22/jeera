import { Component, OnInit } from '@angular/core';
import { Project } from '../projects';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { JeeraDataService } from '../jeera-data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[]=[];

  constructor(private router: Router, private storage: SessionStorageService, private jeera: JeeraDataService) { }

  ngOnInit() {
    this.projects = this.jeera.getProjects();
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
