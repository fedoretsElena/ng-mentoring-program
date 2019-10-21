import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cs-add-course-btn',
  templateUrl: './add-course-btn.component.html',
  styleUrls: ['./add-course-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCourseBtnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
