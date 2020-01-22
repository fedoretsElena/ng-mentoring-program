import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { startWith, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { CoursesService } from '../../services';
import { Course, Filters, Pagination } from '../../entitites';
import { SelectOption } from '../../../shared';
import { AppState } from '../../../core/store/app.state';
import { loadCourses, getCoursesData, deleteCourse, getCoursesLoading } from '../../store';

@Component({
  selector: 'cs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  pagination$: Observable<Pagination> = this.coursesService.pagination$;

  sortByOptions: SelectOption[] = [{
    value: 'date',
    label: null
  }, {
    value: 'length',
    label: null
  }, {
    value: 'isTopRated',
    label: null
  }];

  filters: Filters = {
    count: 5,
    start: 0,
    sort: 'date'
  };

  private translateSub: Subscription;
  private readonly translationKeys: string[] = [
    'SORT_BY_SELECT.CREATION_DATE',
    'SORT_BY_SELECT.DURATION',
    'SORT_BY_SELECT.TOP_RATED'
  ];

  constructor(
    private store: Store<AppState>,
    private translateService: TranslateService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.translateOptions();

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

  ngOnDestroy(): void {
    this.translateSub.unsubscribe();
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

  private translateOptions(): void {
    this.translateSub = this.translateService.onDefaultLangChange.subscribe(() => {
      this.sortByOptions = this.sortByOptions
        .map((option, inx) => ({ ...option, label: this.translateService.instant(this.translationKeys[inx]) }));
    });
  }
}

