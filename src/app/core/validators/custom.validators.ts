import { AbstractControl, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

import { RegExpPatterns } from './reg-exp.patterns';

export class CustomValidators {

  static date(control: AbstractControl): { [key: string]: boolean } | null {
    return moment(control.value, 'DD/MM/YYYY', true).isValid() ? null : {dateFormat: true};
  }

  static onlyNumbers(control: AbstractControl): { [key: string]: boolean } | null {
    return !RegExpPatterns.onlyNumbers.test(control.value) ? {onlyNumbers: true} : null;
  }

  static minArrLength(min: number): ValidatorFn | any {
    return (control: AbstractControl) => {
      if (!control) {
        return;
      }

      const { value } = control;
      return value && value.length < min ? { minArrLength: true } : null;
    };
  }
}
