import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as coursesActions from './courses.actions';
import * as routerActions from './../../core/store';
import { CoursesService } from '../services';
import { Course, ICourse } from '../entitites';

@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {
  }

  getCourses$ = createEffect(() => this.actions$
    .pipe(
      ofType(coursesActions.loadCourses),
      switchMap(({ filters }) => this.coursesService.getList(filters)),
      map((data: Course[]) => coursesActions.loadCoursesSuccess({ data })),
      catchError(() => of(coursesActions.loadCoursesFailure({
        error: 'Load courses failed.'
      })))
    ));

  updateCourse$ = createEffect(() => this.actions$
    .pipe(
      ofType(coursesActions.updateCourse),
      switchMap(({course}) => this.coursesService.updateItem(course)),
      map((course: Course) => coursesActions.updateCourseSuccess({course})),
      catchError(() => of(coursesActions.updateCourseFailure({
        error: 'Update course failed.'
      })))
    ));

  deleteCourse$ = createEffect(() => this.actions$
    .pipe(
      ofType(coursesActions.deleteCourse),
      switchMap(({id}) => this.coursesService.removeItem(id)),
      map((id: any) => coursesActions.deleteCourseSuccess({id})),
      catchError(() => of(coursesActions.deleteCourseFailure({
        error: 'Delete course failed.'
      })))
    ));

  addCourse$ = createEffect(() => this.actions$
    .pipe(
      ofType(coursesActions.addCourse),
      switchMap(({course}) => this.coursesService.createCourse(course)),
      map((course: ICourse) => coursesActions.addCourseSuccess({course})),
      catchError(() => of(coursesActions.addCourseFailure({
        error: 'Add course failed.'
      })))
    ));

  addUpdateProductSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      coursesActions.addCourseSuccess,
      coursesActions.updateCourseSuccess
    ),
    map(() => routerActions.go({
        path: ['./courses']
      })
    )));

  deleteCourseSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(coursesActions.deleteCourseSuccess),
      map(() => coursesActions.loadCourses({}))
    ));
}
