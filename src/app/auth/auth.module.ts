import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    ...AuthRoutingModule.components
  ],
  imports: [
    CommonModule,

    SharedModule,

    AuthRoutingModule
  ]
})
export class AuthModule { }
