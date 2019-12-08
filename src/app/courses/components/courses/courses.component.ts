import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoursesService } from '../../services';
import { Course, Filters } from '../../entitites';

@Component({
  selector: 'cs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  isNextPageExist = true;
  courses$: Observable<Course[]> = this.coursesService.courses$
    .pipe(
      tap((list) => this.isNextPageExist = this.filters.count <= list.length)
    );

  private filters: Filters = {
    count: 5,
    start: 0
  };

  constructor(
    private coursesService: CoursesService
  ) {
  }

  ngOnInit() {
    this.coursesService.onFiltersChange(this.filters);
  }

  onDeleteCourse(courseId: number): void {
    this.coursesService.removeItem(courseId).subscribe();
  }

  onLoadMore(): void {
    const limit = 5;
    this.onChangeFilters(this.filters.count + limit, 'count');
  }

  onChangeSearch(query: string): void {
    this.onChangeFilters(query, 'textFragment');
  }

  private onChangeFilters(value: number | string, key: string) {
    this.filters[key]  = value;

    this.coursesService.onFiltersChange(this.filters);
  }
}

