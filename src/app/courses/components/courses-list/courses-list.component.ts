import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

import { Course } from '../../entitites';

@Component({
  selector: 'cs-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent {
  @Input()
  courses: Course[];

  @Output()
  deleteCourse: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  onDeleteCourse(id: number): void {
    this.deleteCourse.emit(id);
  }
}
