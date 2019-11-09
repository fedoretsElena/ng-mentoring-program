import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseBtnComponent } from './add-course-btn.component';

describe('AddCourseBtnComponent', () => {
  let component: AddCourseBtnComponent;
  let fixture: ComponentFixture<AddCourseBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addCourse() after click on btn', () => {
    const spy = spyOn(component, 'onAddNew');
    const button = fixture.debugElement.nativeElement.querySelector('.btn-info');
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should call console.log after call onAddNew()', () => {
    const spy = spyOn(console, 'log');
    component.onAddNew();

    expect(spy).toHaveBeenCalled();
  });
});
