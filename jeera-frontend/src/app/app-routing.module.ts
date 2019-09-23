import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoriesComponent } from './stories/stories.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';

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
  },
  {
    path: 'all_projects',
    component: ProjectsComponent
  },
  {
    path: 'project',
    component: ProjectDetailComponent
  },
  {
    path: 'goal',
    component: GoalDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
