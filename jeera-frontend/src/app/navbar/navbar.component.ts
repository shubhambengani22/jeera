import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isT1Active:boolean = true;
  isT2Active:boolean = false;
  isT3Active:boolean = false;

  activate(elem){
    //deactivate all first
    this.isT1Active = false;
    this.isT2Active = false;
    this.isT3Active = false;

  switch(elem){
    case 't1':{this.isT1Active = true;break;}
    case 't2':{this.isT2Active = true;break;}
    case 't3':{this.isT3Active = true;break;}
  }
}

  constructor() { }

  ngOnInit() {
  }

}
