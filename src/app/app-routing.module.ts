import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core';
import { PageNotFoundComponent } from './components';
import { CoursesComponent, CourseFormComponent, CourseResolver } from './courses';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'courses'
}, {
  path: 'courses',
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: CoursesComponent
  }, {
    path: 'new',
    component: CourseFormComponent
  }, {
    path: ':id',
    component: CourseFormComponent,
    resolve: {
      course: CourseResolver
    },
  }]
}, {
  path: 'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}, {
  path: 'not-found',
  component: PageNotFoundComponent
}, {
  path: '**',
  redirectTo: 'not-found'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
