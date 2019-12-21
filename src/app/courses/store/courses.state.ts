import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Course } from '../entitites';


export const coursesAdapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export interface CoursesState extends EntityState<Course> {
  readonly error: string;
  readonly loading: boolean;
}

export const initialCoursesState: CoursesState = coursesAdapter.getInitialState({
  error: null,
  loading: false
});

