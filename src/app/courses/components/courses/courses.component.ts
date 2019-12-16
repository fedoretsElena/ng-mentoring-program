import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CoursesService } from '../../services';
import { Course, Filters, Pagination } from '../../entitites';
import { SelectOption } from '../../../shared';

@Component({
  selector: 'cs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = this.coursesService.courses$;
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
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.coursesService.onFiltersChange(this.filters);
  }

  onDeleteCourse(courseId: number): void {
    this.coursesService.removeItem(courseId).subscribe();
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

  private onChangeFilters(filters: Filters): void {
    this.filters  = { ...this.filters, ...filters };

    this.coursesService.onFiltersChange(this.filters);
  }
}

