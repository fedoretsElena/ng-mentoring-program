import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cs-user-action-bar',
  templateUrl: './user-action-bar.component.html',
  styleUrls: ['./user-action-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserActionBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
