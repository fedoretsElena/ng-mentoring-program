import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services';

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
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {
  }

  ngOnInit() {
    this.checkCourseDataFromResolver();
  }

  onSubmit(value = this.courseForm): void {
    value.authors = this.prepareAuthors(value.authors);

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
