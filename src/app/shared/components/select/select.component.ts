import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SelectOption } from './select-option.model';

@Component({
  selector: 'cs-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
  @Input()
  initial: string;

  @Input()
  options: SelectOption[];

  @Input()
  label: string;

  @Output()
  selected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onChange(value: string): void {
    this.selected.emit(value);
  }
}
