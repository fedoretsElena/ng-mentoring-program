import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Course } from '../../entitites';

@Component({
  selector: 'cs-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {
  @Input()
  course: Course;

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onEdit(): void {}

  onDelete(): void {
    this.delete.emit(this.course.id);
  }
}
