import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { components, LoginComponent, AuthComponent } from './components';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
    path: '',
    redirectTo: 'login'
  }, {
    path: 'login',
    component: LoginComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  static components = components;
}
