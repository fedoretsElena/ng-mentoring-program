import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/components';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'courses'
}, {
  path: 'courses',
  component: CoursesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
