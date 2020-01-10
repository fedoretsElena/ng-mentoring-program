import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CoursesService } from '../../services';
import { Course, Filters, Pagination } from '../../entitites';
import { SelectOption } from '../../../shared';
import { AppState } from '../../../core/store/app.state';
import { loadCourses, getCoursesData, deleteCourse, getCoursesLoading } from '../../store';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'cs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  pagination$: Observable<Pagination> = this.coursesService.pagination$;

  sortByOptions: SelectOption[] = [{
    value: 'date',
    label: 'Creation date'
  }, {
    value: 'length',
    label: 'Duration'
  }, {
    value: 'isTopRated',
    label: 'Top rated'
  }];

  filters: Filters = {
    count: 5,
    start: 0,
    sort: 'date'
  };

  constructor(
    private store: Store<AppState>,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select(getCoursesLoading)
      .pipe(
        startWith(true)
      );
    this.courses$ = this.store.select(getCoursesData)
      .pipe(
        tap(courses => {
          if (!courses.length && !this.filters.textFragment) {
            this.store.dispatch(loadCourses({ filters: this.filters }));
          }
        })
      );

    this.coursesService.onFiltersChange(this.filters);
  }

  onDeleteCourse(courseId: number): void {
    this.store.dispatch(deleteCourse({ id: courseId }));
  }

  onPreviousPage(): void {
    const limit = 5;
    this.onChangeFilters({ start: this.filters.start - limit });
  }

  onLoadMore(): void {
    const limit = 5;
    this.onChangeFilters({ start: this.filters.start + limit });
  }

  onChangeSearch(textFragment: string): void {
    this.onChangeFilters({ textFragment });
  }

  onSelectSortBy(sort: string): void {
    this.onChangeFilters({ sort, start: 0 });
  }

  onChangeFilters(filters: Filters): void {
    this.filters  = { ...this.filters, ...filters };

    this.coursesService.onFiltersChange(this.filters);
    this.store.dispatch(loadCourses({ filters: this.filters }));
  }
}

