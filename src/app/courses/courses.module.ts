import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SharedModule } from '../shared';
import { components, CoursesComponent } from './components';
import { directives } from './directives';
import { pipes } from './pipes';


@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes
  ],
  imports: [
    CommonModule,
    FormsModule,

    SweetAlert2Module,

    SharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
