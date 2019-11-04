import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { StoriesComponent } from './stories/stories.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { GoalDetailComponent } from './goal-detail/goal-detail.component'
import { HttpClientModule } from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ProgressBarModule} from "angular-progress-bar"
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxPaginationModule} from 'ngx-pagination';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    StoryDetailComponent,
    StoriesComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    GoalDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FusionChartsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ProgressBarModule,
    MatSnackBarModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
