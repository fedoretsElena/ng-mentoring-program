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
});
