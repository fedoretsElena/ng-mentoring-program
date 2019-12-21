import { createAction, props } from '@ngrx/store';

import { Course, Filters, ICourse } from '../entitites';

export const loadCourses = createAction(
  '[Courses] Load Courses',
  props<({ filters?: Filters })>()
);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ data: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: string }>()
);

export const updateCourse = createAction(
  '[Course form] Update Course',
  props<{ course: ICourse }>()
);

export const updateCourseSuccess = createAction(
  '[Update Course Effect] Update Course Success',
  props<{ course: Course }>()
);

export const updateCourseFailure = createAction(
  '[Update Course Effect] Update Course Failure',
  props<{ error: any }>()
);

export const addCourse = createAction(
  '[Course Form] Add Course',
  props<{ course: ICourse }>()
);

export const addCourseSuccess = createAction(
  '[Add Course Effect] Add Course Success',
  props<{ course: ICourse }>()
);

export const addCourseFailure = createAction(
  '[Add Course Effect] Add Course Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  '[Delete Course Effect] Delete Course Success',
  props<{ id: number }>()
);

export const deleteCourseFailure = createAction(
  '[Delete Course Effect] Delete Course Failure',
  props<{ error: any }>()
);
