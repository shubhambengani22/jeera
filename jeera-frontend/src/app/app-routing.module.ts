import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoriesComponent } from './stories/stories.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'story',
    component: StoryDetailComponent
  },
  {
    path: 'all_stories',
    component: StoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
