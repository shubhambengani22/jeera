import { Component, OnInit } from '@angular/core';
import { Story } from '../stories';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css',],
})
export class DashboardComponent implements OnInit {

  colors = {
    'enhancement': '#FFDD05',
    'bug': '#9B1C31',
    'development': '#006400'
  }
  // enhancement_color = '#FFDD05';
  // bug_color = '#9B1C31';
  // dev_color = '#006400';

  stories: Story[] = [
    {
      id: 1,
      title: "Story 1",
      desc: "Description of Story1",
      type: "enhancement",
      level: 'Demon'

    },
    {
      id: 2,
      title: "Story 2",
      desc: "Description of Story2",
      type: "bug",
      level: 'Dragon'
    },
  ];

  borderLeft(color){
    return {
      'border-left-color': this.colors[color],
      'border-left-width': '10px',
      'border-left-style': 'solid'
    }
  }  

  // headerColor(color){
  //   return {
  //     'background': this.colors[color],
  //   }
  // }

  dataSource = {
    "chart": {
      "caption": "Recommended Portfolio Split",
      "showValues":"1",
      "showPercentInTooltip" : "0",
      "enableMultiSlicing":"1",
      "theme": "fusion"
    },
    "data": [{
      "label": "Equity",
      "value": "300000"
    }, {
      "label": "Debt",
      "value": "230000"
    }, {
      "label": "Bullion",
      "value": "180000"
    }, {
      "label": "Real-estate",
      "value": "270000"
    }, {
      "label": "Insurance",
      "value": "20000"
    }]
}

line_data = {
  chart: {
    caption: "Average Fastball Velocity",
    yaxisname: "Velocity (in mph)",
    subcaption: "[2005-2016]",
    numbersuffix: " mph",
    rotatelabels: "1",
    setadaptiveymin: "1",
    theme: "fusion"
  },
  data: [
    {
      label: "2005",
      value: "89.45"
    },
    {
      label: "2006",
      value: "89.87"
    },
    {
      label: "2007",
      value: "89.64"
    },
    {
      label: "2008",
      value: "90.13"
    },
    {
      label: "2009",
      value: "90.67"
    },
    {
      label: "2010",
      value: "90.54"
    },
    {
      label: "2011",
      value: "90.75"
    },
    {
      label: "2012",
      value: "90.8"
    },
    {
      label: "2013",
      value: "91.16"
    },
    {
      label: "2014",
      value: "91.37"
    },
    {
      label: "2015",
      value: "91.66"
    },
    {
      label: "2016",
      value: "91.8"
    }
  ]
};

  width = 600;
  height = 200;
  type = "line";
  dataFormat = "json";
  line_dataSource = this.line_data;

  constructor(private router: Router, private storage: SessionStorageService) {
    
   }

  ngOnInit() {
  }

  goToStory(story_id, story_title, story_desc, story_type, story_level){
    this.storage.set('story_id', story_id);
    this.storage.set('story_title', story_title);
    this.storage.set('story_desc', story_desc);
    this.storage.set('story_type', story_type);
    this.storage.set('story_level', story_level);
    this.router.navigate(['/story']);
  }

}
