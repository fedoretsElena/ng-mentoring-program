import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { CourseFormComponent } from './course-form.component';
import { SharedModule } from '../../../shared';
import { Course, ICourse } from '../../entitites';
import { AppState } from '../../../core/store';
import { addCourse, updateCourse } from '../../store';

const mockCourse = new Course({
  creationDate: new Date(),
  authors: [{
    id: 1,
    name: 'Oleg',
    lastName: 'Donsov'
  }]
});

const mockRoute = {
  snapshot: {
    data: {
      course: mockCourse
    }
  }
};

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let mockStore: MockStore<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseFormComponent],
      providers: [provideMockStore(), {
        provide: ActivatedRoute,
        useValue: mockRoute
      }],
      imports: [
        SharedModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should dispatch updateCourse if it is editing mode', () => {
      const course = { ...mockCourse, authors: []};
      const updateSpy = spyOn(mockStore, 'dispatch');
      component.isCreateMode = false;
      component.courseForm = {
       ...course,
        authors: null
      };

      component.onSubmit();

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(updateCourse({course}));
    });

    it('should dispatch addCourse if it is creating mode', () => {
      const course = {...mockCourse, authors: [{ name: 'Ted', lastName: 'Stoun'}]} as ICourse;
      const updateSpy = spyOn(mockStore, 'dispatch');
      component.isCreateMode = true;
      component.courseForm = {...mockCourse, authors: 'Ted Stoun'};

      component.onSubmit();

      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(addCourse({course}));
    });

    it('should change form value after call onChange output', () => {
      const key = 'title';
      const value = 'Angular';
      component.onChange(value, key);

      expect(component.courseForm[key]).toBe(value);
    });
  });
});
