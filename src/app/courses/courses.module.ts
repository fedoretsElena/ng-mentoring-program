import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared';
import { components, CoursesComponent } from './components';

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,

    FormsModule,

    SharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
