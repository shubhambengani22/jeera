import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import { FormsModule } from '@angular/forms';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { StoriesComponent } from './stories/stories.component';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    StoryDetailComponent,
    StoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FusionChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
