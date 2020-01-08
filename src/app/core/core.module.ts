import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { userFeatureKey, userReducer } from './store/user';
import { UserEffects } from './store/user/user.effects';


@NgModule({
  imports: [
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})

export class CoreModule {}
