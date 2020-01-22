import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { DatepickerComponent } from './datepicker.component';
import { InputErrorsComponent } from '../input-errors';

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
        InputErrorsComponent
      ],
      imports: [
        FormsModule,
        TranslateModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should replace onChange func', () => {
    const func = () => null;
    component.registerOnChange(func);

    expect(component.onChange()).toBeNull();
  });

  it('should replace onTouch func', () => {
    const func = () => null;
    component.registerOnTouched(func);

    expect(component.onTouched()).toBeNull();
  });

  it('should call onTouched after blur event appeared', () => {
    const spy = spyOn(component, 'onTouched');

    component.onBlur();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate and initialized control', () => {
    const date = '12/12/1222';
    const control = new FormControl(date);
    component.validate(control);

    expect(component.control.value).toEqual(date);
  });

  it('should initialize date if value is not the same', () => {
    component.writeValue('12/05/1789');
    expect(component.date).toBe('12/05/1789');
  });
});
