import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cs-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  id = Math.round(Math.random() * +new Date());

  @Input()
  label: string;

  @Input()
  placeholder = '';

  @Input()
  isRequired = true;

  @Input()
  control;

  @Input()
  initial: string;
}
