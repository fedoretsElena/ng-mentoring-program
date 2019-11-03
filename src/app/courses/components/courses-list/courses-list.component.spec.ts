import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CourseItemComponent } from '../course-item';
import { SharedModule } from '../../../shared';
import { courses } from '../../mocks';
import { Course } from '../../entitites';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CourseItemComponent,
      ],
      imports: [
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.courses = courses.map(course => new Course(course));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize @Input courses', () => {
    expect(component.courses).toBeTruthy();
    expect(component.courses.length).toBe(courses.length);
  });

  it('should raise deleteCourse event when output onDeleteCourse called', () => {
    const mockId = 2;
    let deletedId: number;

    component.deleteCourse.subscribe((id) => deletedId = id);
    component.onDeleteCourse(mockId);

    expect(deletedId).toBe(mockId);
  });
});
