import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap, share, tap } from 'rxjs/operators';

import { Course, Filters, ICourse, IExtendedCourse, Pagination } from '../entitites';
import { ApiConfig } from '../../core/services';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {
  private filtersSink: BehaviorSubject<Filters> = new BehaviorSubject({
    count: 5,
    start: 0
  });

  private removeCourseSink: BehaviorSubject<void> = new BehaviorSubject(null);
  private removeCourse$: Observable<void> = this.removeCourseSink.asObservable();

  filters$: Observable<Filters> = this.filtersSink.asObservable();
  courses$: Observable<Course[]> = combineLatest([this.filters$, this.removeCourse$])
    .pipe(
      mergeMap(([filters]) => this.getList(filters))
    );
  pagination$: Observable<Pagination> = combineLatest([
    this.getList(),
    this.filters$
  ])
    .pipe(
      map(([allCourses, filters]) => ({
        isNextExist: allCourses.length > filters.start + filters.count && !filters.textFragment,
        isPrevExist: filters.start !== 0 && !filters.textFragment
      })),
      share()
    );

  // for breadcrumbs title name
  currCourse: Course;

  constructor(
    private http: HttpClient
  ) {}

  getList(filters: Filters = {}): Observable<Course[]> {
    let params = new HttpParams();

    for (const key of Object.keys(filters)) {
      params = params.append(key, filters[key]);
    }

    return this.http.get(ApiConfig.COURSES_BASE_URL, {params})
      .pipe(
        map((items: ICourse[]) => items.map((i) => new Course(i)))
      );
  }

  createCourse(course: Partial<ICourse>): Observable<object> {
    return this.http.post(ApiConfig.COURSES_BASE_URL, this.prepareData(course));
  }

  getItemById(id: number): Observable<Course> {
    return this.http.get(ApiConfig.COURSES_BASE_URL + id)
      .pipe(
        map((course: ICourse) => new Course(course)),
        tap(course => this.currCourse = course),
        catchError(() => throwError(`Error: Course with id ${id} does not exist.`))
      );
  }

  updateItem(item: Partial<ICourse>): Observable<object> {
    return this.http.patch(ApiConfig.COURSES_BASE_URL + item.id, this.prepareData(item));
  }

  removeItem(id: number): Observable<object> {
    return this.http.delete(ApiConfig.COURSES_BASE_URL + id)
      .pipe(
        tap(() => this.removeCourseSink.next())
      );
  }

  onFiltersChange(filters: Partial<Filters>): void {
    this.filtersSink.next(filters);
  }

  private prepareData(course: Partial<ICourse>): Partial<IExtendedCourse> {
    return {
      ...course,
      length: +course.duration,
      date: course.creationDate,
      name: course.title
    };
  }
}
