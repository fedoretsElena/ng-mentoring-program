import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import { CustomValidators } from '../../../core/validators';

@Component({
  selector: 'cs-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor, Validator {
  @Input()
  placeholder: string;

  @Input()
  label: string;

  date = '';
  id = Math.round(Math.random() * +new Date());
  control: AbstractControl = new FormControl();

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;

    return CustomValidators.date(control);
  }

  writeValue(value: string): void {
    if (value !== this.date) {
      this.date = value;
    }

    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onChange: any = () => {};

  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
