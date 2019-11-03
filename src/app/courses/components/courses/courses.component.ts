import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { courses } from '../../mocks';
import { Course } from '../../entitites';

@Component({
  selector: 'cs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor() { }

  ngOnInit() {
    this.courses$ = of(courses)
      .pipe(
        map(items => items.map((i) => new Course(i)))
      );
  }

  onDeleteCourse(courseId: number): void {
    console.log('This course should be deleted: ', courseId);
  }

  onLoadMore(): void {
    console.log('Load more pls!');
  }

}
