import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, mapTo, tap, withLatestFrom } from 'rxjs/operators';

import { Course, ICourse } from '../entitites';
import { courses } from '../mocks';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  private coursesSink: BehaviorSubject<ICourse[]> = new BehaviorSubject([...courses]);
  courses$: Observable<ICourse[]> = this.coursesSink.asObservable();

  constructor() {
  }

  getList(): Observable<Course[]> {
    return this.courses$
      .pipe(
        map((items: ICourse[]) => items.map((i) => new Course(i)))
      );
  }

  createCourse(course: ICourse): Observable<Course> {
    return of(course)
      .pipe(
        withLatestFrom(this.courses$),
        map(([item, list]) => [item, ...list]),
        tap((list: ICourse[]) => this.updateCoursesList(list)),
        mapTo(new Course(course))
      );
  }

  getItemById(id: number): Observable<Course | Observable<never>> {
    return of(id)
      .pipe(
        withLatestFrom(this.courses$),
        map(([course, list]) => {
          const item = list.find(i => i.id === id);

          if (item) {
            return new Course(item);
          }

          throw new Error(`Course with id ${id} does not exist.`);
        })
      );
  }

  updateItem(item: Partial<ICourse>): Observable<Course> {
    return of(item)
      .pipe(
        withLatestFrom(this.courses$),
        map(([course, list]) => {
          const inx = list.findIndex(i => i.id === course.id);
          const newCourse = {...list[inx], ...course};

          list[inx] = newCourse;
          return list;
        }),
        tap((list: ICourse[]) => this.updateCoursesList(list)),
        mapTo(new Course(item))
      );
  }

  removeItem(id: number): Observable<null> {
    return of(id)
      .pipe(
        withLatestFrom(this.courses$),
        map(([courseId, list]) => list.filter(course => course.id !== courseId)),
        tap((list: ICourse[]) => this.updateCoursesList(list)),
        mapTo(null)
      );
  }

  private updateCoursesList(list: ICourse[]): void {
    this.coursesSink.next(list);
  }
}
