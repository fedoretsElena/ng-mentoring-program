import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    RouterModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    ...pipes,
    ...sharedComponents
  ]
})
export class SharedModule { }
