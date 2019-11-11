import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { courses } from '../../mocks';
import { Course, ICourse } from '../../entitites';
import { SearchByPipe } from '../../pipes';

@Component({
  selector: 'cs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  private search: BehaviorSubject<string> = new BehaviorSubject(null);
  private search$: Observable<string> = this.search.asObservable();

  constructor() { }

  ngOnInit() {
    const searchPipe = new SearchByPipe();
    const courses$ = of(courses);

    this.courses$ = combineLatest<[ICourse[], string]>([courses$, this.search$])
      .pipe(
        map(([list, search]) => searchPipe.transform(list, search)),
        map(items => items.map((i) => new Course(i)))
      );
  }

  onDeleteCourse(courseId: number): void {
    console.log('This course should be deleted: ', courseId);
  }

  onLoadMore(): void {
    console.log('Load more pls!');
  }

  onChangeSearch(q: string): void {
    this.search.next(q);
  }
}

