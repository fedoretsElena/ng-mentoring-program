import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DateStatusDirective } from './date-status.directive';

@Component({
  template: `
    <div csDateStatus [date]="date"></div>
  `
})
class TestComponent {
  date: string;
}

describe('DateStatusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des;
  let component;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        DateStatusDirective,
        TestComponent
      ]
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    component.date = '2025-12-01';

    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(DateStatusDirective));

  }));


  it('should have one element with dateStatus', () => {
    expect(des.length).toBe(1);
  });

  it('should have add border-info if date is in future', () => {
    const { classList } = des[0].nativeElement;

    expect(classList).toContain('border-info');
  });
});
