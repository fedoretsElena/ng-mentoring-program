import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CourseItemComponent } from './course-item.component';
import { SharedModule } from '../../../shared';
import { courses } from '../../mocks';
import { Course } from '../../entitites';
import { DateStatusDirective } from '../../directives';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,

        DateStatusDirective
      ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = {
      id: 1,
      duration: 123,
      topRated: false,
      title: 'Test course',
      creationDate: new Date(),
      description: 'Once upon a time..'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize @Input course', () => {
    component.course = new Course(courses[0]);
    fixture.detectChanges();

    expect(component.course).toBeDefined();
  });

  it('should raise own id when clicked (triggerEventHandler)', () => {
    let selectedId: number;
    const deleteBtn = fixture.debugElement.query(By.css('.course__delete-btn'));
    component.delete.subscribe((id: number) => selectedId = id);

    deleteBtn.triggerEventHandler('click', null);
    expect(selectedId).toBe(component.course.id);
  });
});
