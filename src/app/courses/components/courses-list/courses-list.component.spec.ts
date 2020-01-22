import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockDirective } from 'ng-mocks';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { CoursesListComponent } from './courses-list.component';
import { CourseItemComponent } from '../course-item';
import { SharedModule } from '../../../shared';
import { courses } from '../../mocks';
import { Course } from '../../entitites';
import { DateStatusDirective } from '../../directives';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        CourseItemComponent,

        DateStatusDirective,
        MockDirective(SwalDirective)
      ],
      imports: [
        TranslateModule,
        RouterTestingModule,

        SharedModule,
      ],
      providers: [{
        provide: TranslateService,
        useValue: { get() { return of(''); }}
      }]
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
