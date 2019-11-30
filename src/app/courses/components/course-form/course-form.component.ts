import { Component, OnInit } from '@angular/core';

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
    date: null,
    authors: null
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(): void {
  }
}
