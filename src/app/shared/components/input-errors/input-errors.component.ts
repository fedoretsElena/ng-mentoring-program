import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cs-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent {
  @Input()
  control: FormControl;
}
