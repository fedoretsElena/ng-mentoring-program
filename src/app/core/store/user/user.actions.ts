import { createAction, props } from '@ngrx/store';
import { User } from '../../entities';

export const loadUser = createAction(
  '[User] Load User',
  props<({ token: string })>()
);

export const loadUserSuccess = createAction(
  '[User] Load Courses Success',
  props<{ data: User }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Logout] Delete User'
);

