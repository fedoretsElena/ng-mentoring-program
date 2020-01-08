import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { addCourse, updateCourse } from '../../store';
import { AppState } from '../../../core/store/app.state';
import { ICourse } from '../../entitites';

@Component({
  selector: 'cs-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm = {
    title: null,
    description: null,
    duration: null,
    creationDate: null,
    authors: null
  };
  isCreateMode = true;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.checkCourseDataFromResolver();
  }

  onSubmit(value = this.courseForm): void {
    const prepared = { ...value };
    prepared.authors = prepared.authors ? this.prepareAuthors(prepared.authors) : [];

    this.store.dispatch(
      this.isCreateMode
        ? addCourse({ course: prepared as ICourse})
        : updateCourse({ course: prepared as ICourse }));
  }

  onChange(value: string, key: string): void {
    this.courseForm[key] = value;
  }

  private checkCourseDataFromResolver() {
    const { course } = this.route.snapshot.data;

    if (course) {
      this.isCreateMode = false;
      this.courseForm = {
        ...course,
        creationDate: new Date(course.creationDate).toISOString().slice(0, 10),
        authors: course.authors.map((author) => author.fullName).join(', ')
      };
    }
  }

  private prepareAuthors(authors: string): { name: string; lastName: string }[] {
    return authors.split(', ')
      .map((name) => name.split(' '))
      .map(([name, lastName]) => ({name, lastName}));
  }
}
