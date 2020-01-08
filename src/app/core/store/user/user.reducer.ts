import { Action, createReducer, on } from '@ngrx/store';

import * as userActions from './user.actions';
import { initialUserState, UserState } from './user.state';

export const userFeatureKey = 'user';

const reducer = createReducer(
  initialUserState,
  on(userActions.deleteUser, (state) => ({ ...state, data: null })),
  on(userActions.loadUserSuccess, (state, {data}) => ({
    ...state,
    data
  })),
);

export function userReducer(
  state: UserState,
  action: Action
) {
  return reducer(state, action);
}
