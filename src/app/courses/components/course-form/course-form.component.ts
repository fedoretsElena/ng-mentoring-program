import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { addCourse, updateCourse } from '../../store';
import { AppState } from '../../../core/store/app.state';
import { ICourse } from '../../entitites';
import { AuthorsService } from '../../services';

@Component({
  selector: 'cs-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isCreateMode = true;

  authors$ = this.authorsService.getAuthors();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private authorsService: AuthorsService
  ) {
    this.courseForm = this.fb.group({
      id: null,
      title: [null, [
        Validators.required,
        Validators.maxLength(50)
      ]],
      description: [null, [
        Validators.required,
        Validators.maxLength(500)
      ]],
      creationDate: [null, [
        Validators.required
      ]],
      duration: [null, [
        Validators.required
      ]],
      authors: [[], [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    this.checkCourseDataFromResolver();
  }

  onSubmit(value: ICourse): void {
    const prepared = { ...value, creationDate: moment(value.creationDate).format()};

    this.store.dispatch(
      this.isCreateMode
        ? addCourse({ course: prepared })
        : updateCourse({ course: prepared }));
  }

  private checkCourseDataFromResolver() {
    const { course } = this.route.snapshot.data;

    if (course) {
      this.isCreateMode = false;

      this.courseForm.patchValue({
        ...course,
        creationDate: moment(course.creationDate).format( 'DD/MM/YYYY')
      });
    }
  }
}
