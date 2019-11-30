import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent, CourseFormComponent } from './courses/components';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'courses'
}, {
  path: 'courses',
  children: [{
    path: '',
    component: CoursesComponent
  }, {
    path: 'new',
    component: CourseFormComponent
  }]
}, {
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
