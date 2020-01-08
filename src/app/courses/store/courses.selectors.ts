import { createFeatureSelector, createSelector } from '@ngrx/store';

import { coursesAdapter, CoursesState } from './courses.state';
import { coursesFeatureKey } from './courses.reducer';
import { getRouterParams } from '../../core/store';
import { Course } from '../entitites';


export const getCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const {
  selectEntities: getCoursesEntities,
  selectAll: getCoursesData
} = coursesAdapter.getSelectors(getCoursesState);

export const getCoursesLoading = createSelector(getCoursesState, (state: CoursesState) =>
  state.loading);

export const getCourseByUrl = createSelector(
  getCoursesEntities,
  getRouterParams,
  (courses, params): Course => {
    const { id } = params;

    if (id) {
      return courses[id];
    }

    return null;
  });
