import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cs-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  id = Math.round(Math.random() * +new Date());

  @Input()
  label: string;

  @Input()
  textarea = false;

  @Input()
  placeholder = '';

  @Input()
  control: FormControl;
}
