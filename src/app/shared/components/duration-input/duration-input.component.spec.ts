import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { DurationInputComponent } from './duration-input.component';
import { DurationPipe } from '../../pipes/duration.pipe';
import { InputErrorsComponent } from '../input-errors';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DurationInputComponent,
        DurationPipe,
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
    fixture = TestBed.createComponent(DurationInputComponent);
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
    const duration = '123';
    const control = new FormControl(duration);
    component.validate(control);

    expect(component.control.value).toEqual(duration);
  });

  it('should initialize duration if value is not the same', () => {
    component.writeValue('45');
    expect(component.duration).toBe('45');
  });
});
