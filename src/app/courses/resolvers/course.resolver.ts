import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from '../entitites';
import { CoursesService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {
  constructor(
    private router: Router,
    private coursesService: CoursesService
  ) {
  }


  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    const courseId = route.paramMap.get('id');

    return this.coursesService.getItemById(+courseId)
      .pipe(
        catchError(() => {
          this.router.navigate(['/courses']);
          return of(null);
        })
      );
  }
}
