import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { pipes } from './pipes';
import { privateComponents, sharedComponents } from './components';

@NgModule({
  declarations: [
    ...pipes,
    ...sharedComponents,
    ...privateComponents
  ],
  imports: [
    CommonModule,

    RouterModule
  ],
  exports: [
    ...pipes,
    ...sharedComponents
  ]
})
export class SharedModule { }
