import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    ...AuthRoutingModule.components
  ],
  imports: [
    CommonModule,
    TranslateModule,

    SharedModule,

    AuthRoutingModule
  ]
})
export class AuthModule { }
