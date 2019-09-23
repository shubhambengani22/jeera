import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project_id: number;
  project_title: string;
  project_git: string;

  constructor(private storage: SessionStorageService, @Inject(DOCUMENT) document) { }

  ngOnInit() {
    this.project_id = this.storage.get("project_id");
    this.project_title = this.storage.get("project_title");
    this.project_git = this.storage.get("project_git");
  }

}
