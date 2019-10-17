import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { privateComponents, sharedComponents } from './components';

@NgModule({
  declarations: [
    ...sharedComponents,
    ...privateComponents
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...sharedComponents
  ]
})
export class SharedModule { }
