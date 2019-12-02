import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cs-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  id = Math.round(Math.random() * +new Date());

  @Output()
  changeValue: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  label: string;

  @Input()
  textarea = false;

  @Input()
  type = 'text';

  @Input()
  placeholder = '';

  @Input()
  isRequired = true;

  @Input()
  control;

  onModelChanged(v: string): void {
    this.changeValue.emit(v);
  }
}
