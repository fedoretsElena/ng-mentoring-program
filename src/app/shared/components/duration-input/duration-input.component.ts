import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import { CustomValidators } from '../../../core/validators';

@Component({
  selector: 'cs-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    }
  ]
})
export class DurationInputComponent implements ControlValueAccessor, Validator {
  @Input()
  placeholder: string;

  @Input()
  label: string;

  duration = null;
  id = Math.round(Math.random() * +new Date());
  control: AbstractControl = new FormControl();

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;

    return CustomValidators.onlyNumbers(control);
  }

  writeValue(value: string): void {
    if (value !== this.duration) {
      this.duration = value;
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
