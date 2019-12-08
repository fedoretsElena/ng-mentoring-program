import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourse } from '../../entitites';
import { CoursesService } from '../../services';

@Component({
  selector: 'cs-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm: Partial<ICourse> = {
    title: null,
    description: null,
    duration: null,
    creationDate: null,
    authors: null
  };
  isCreateMode = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {
  }

  ngOnInit() {
    this.checkCourseDataFromResolver();
  }

  onSubmit(value: Partial<ICourse>): void {
    const source$ = this.coursesService[this.isCreateMode ? 'createCourse' : 'updateItem'](value);

    source$.subscribe(() => this.router.navigate(['/courses']));
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
        creationDate: new Date(course.creationDate).toISOString().slice(0, 10)
      };
    }
  }
}
