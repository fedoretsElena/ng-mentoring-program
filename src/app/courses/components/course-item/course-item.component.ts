import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '../../entitites';

@Component({
  selector: 'cs-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent {
  @Input()
  course: Course;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  onEdit(id: number): void {
    console.log('Will be edited', id);
  }

  onDelete(): void {
    this.delete.emit(this.course.id);
  }

  getSwalConfig(): {[key: string]: any} {
    return {
      title: 'Do you really want to delete this course?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    };
  }
}
