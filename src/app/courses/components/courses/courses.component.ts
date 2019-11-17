import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SearchByPipe } from '../../pipes';
import { CoursesService } from '../../services';
import { Course, ICourse } from '../../entitites';

@Component({
  selector: 'cs-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  private searchSink: BehaviorSubject<string> = new BehaviorSubject(null);
  private search$: Observable<string> = this.searchSink.asObservable();

  constructor(
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    const searchPipe = new SearchByPipe();
    const courses$ = this.coursesService.getList();

    this.courses$ = combineLatest<[ICourse[], string]>([courses$, this.search$])
      .pipe(
        map(([list, search]) => searchPipe.transform(list, search)),
        map(items => items.map((i) => new Course(i)))
      );
  }

  onDeleteCourse(courseId: number): void {
    this.coursesService.removeItem(courseId).subscribe();
  }

  onLoadMore(): void {
    console.log('Load more pls!');
  }

  onChangeSearch(q: string): void {
    this.searchSink.next(q);
  }
}

