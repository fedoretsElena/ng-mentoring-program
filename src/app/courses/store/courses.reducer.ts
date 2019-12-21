import { Action, createReducer, on } from '@ngrx/store';

import { initialCoursesState, coursesAdapter, CoursesState } from './courses.state';

import * as coursesActions from './courses.actions';
import { Author, Course } from '../entitites';

export const coursesFeatureKey = 'courses';

const reducer = createReducer(
  initialCoursesState,
  on(coursesActions.loadCourses, (state) => ({ ...state, loading: true, error: null})),
  on(coursesActions.loadCoursesSuccess, (state, {data}) => coursesAdapter.addAll([...data], {
    ...state,
    error: null,
    loading: false
  })),
  on(coursesActions.updateCourseSuccess, (state, {course}) => coursesAdapter.updateOne({
    id: course.id,
    changes: {...course, authors: course.authors.map(author => new Author(author))}
  }, state)),
  on(coursesActions.addCourseSuccess, (state, {course}) => coursesAdapter.addOne(new Course(course), state)),
  on(coursesActions.deleteCourseSuccess, (state, {id}) => coursesAdapter.removeOne(id, state)),
  on(
    coursesActions.addCourseFailure,
    coursesActions.loadCoursesFailure,
    coursesActions.updateCourseFailure,
    coursesActions.deleteCourseFailure,
    (state, {error}) => ({...state, error})),
);

export function coursesReducer(
  state: CoursesState,
  action: Action
) {
  return reducer(state, action);
}
