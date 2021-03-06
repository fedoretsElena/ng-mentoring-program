import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

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
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  exports: [
    ...pipes,
    ...sharedComponents
  ]
})
export class SharedModule { }
