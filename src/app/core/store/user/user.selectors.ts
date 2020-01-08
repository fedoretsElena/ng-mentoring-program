import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './user.state';
import { userFeatureKey } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>(userFeatureKey);

export const getUser = createSelector(getUserState, (state: UserState) =>
  state.data);
