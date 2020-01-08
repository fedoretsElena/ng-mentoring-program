import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Course } from '../entitites';
import { getCourseByUrl } from '../store';
import { AppState } from '../../core/store';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {
  constructor(
    private store: Store<AppState>
  ) {
  }


  resolve(route: ActivatedRouteSnapshot): Observable<Course> {

    return this.store.select(getCourseByUrl)
      .pipe(
        first()
      );
  }
}
