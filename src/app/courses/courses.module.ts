import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components, CoursesComponent } from './components';

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
