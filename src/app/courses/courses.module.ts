import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared';
import { components, CoursesComponent } from './components';
import { directives } from './directives';
import { pipes } from './pipes';

import { CoursesEffects, coursesFeatureKey, coursesReducer } from './store';


@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,

    SweetAlert2Module,
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),

    SharedModule
  ],
  exports: [
    CoursesComponent
  ]
})
export class CoursesModule { }
