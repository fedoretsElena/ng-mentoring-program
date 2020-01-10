import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom.validators';

describe('CustomValidators', () => {
  let control;

  beforeEach(() => {
    control = new FormControl('');
  });

  describe('date validator', () => {

    it('should return null if format is correct', () => {
      control.setValue('12/12/1278');

      expect(CustomValidators.date(control)).toBeNull();
    });

    it('should return an error { dateFormat: true } if format is incorrect', () => {
      control.setValue('12/28/1278');

      expect(CustomValidators.date(control)).toEqual({dateFormat: true});
    });
  });

  describe('onlyNumber validator', () => {

    it('should return an error if value is not number', () => {
      control.setValue('qwerty');

      expect(CustomValidators.onlyNumbers(control)).toEqual({onlyNumbers: true});
    });

    it('should return null if value is number', () => {
      control.setValue(1);

      expect(CustomValidators.onlyNumbers(control)).toBeNull();
    });
  });

  describe('minArrLength validator', () => {

    it('should return an error if arr is empty', () => {
      control.setValue([]);

      expect(CustomValidators.minArrLength(1)(control)).toEqual({minArrLength: true});
    });

    it('should return null if length more than 1', () => {
      control.setValue([1]);

      expect(CustomValidators.minArrLength(1)(control)).toBeNull();
    });

    it('should return undefined if no control provided', () => {
      expect(CustomValidators.minArrLength(1)()).toBeUndefined();
    });
  });

});
