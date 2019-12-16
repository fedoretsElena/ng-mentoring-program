import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';

import { CourseFormComponent } from './course-form.component';
import { SharedModule } from '../../../shared';
import { CoursesService } from '../../services';
import { Course } from '../../entitites';

class MockCoursesService {
  updateItem() {
  }

  createCourse() {
  }
}

const mockRoute = {
  snapshot: {
    data: {
      course: new Course({
        creationDate: new Date(),
        authors: [{
          id: 1,
          name: 'Oleg',
          lastName: 'Donsov'
        }]
      })
    }
  }
};

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let coursesService: CoursesService;

  let routerValueSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CourseFormComponent],
      providers: [{
        provide: CoursesService,
        useClass: MockCoursesService
      }, {
        provide: Router,
        useValue: routerSpy
      }, {
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
    coursesService = TestBed.get(CoursesService);
    routerValueSpy = TestBed.get(Router);

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should call updateItem() if it is editing mode', () => {
      const updateSpy = spyOn(coursesService, 'updateItem').and.returnValue(of());
      const createSpy = spyOn(coursesService, 'createCourse').and.returnValue(of());
      component.isCreateMode = false;
      component.courseForm = {
        authors: null
      } as any;

      component.onSubmit();

      expect(updateSpy).toHaveBeenCalledWith({ authors: [] });
      expect(createSpy).not.toHaveBeenCalled();
    });

    it('should call createCourse() if it is creating mode', () => {
      const createSpy = spyOn(coursesService, 'createCourse').and.returnValue(of(new Course()));
      component.isCreateMode = true;

      component.onSubmit();

      expect(createSpy).toHaveBeenCalled();
      expect(routerValueSpy.navigate).toHaveBeenCalledWith(['/courses']);
    });

    it('should change form value after call onChange output', () => {
      const key = 'title';
      const value = 'Angular';
      component.onChange(value, key);

      expect(component.courseForm[key]).toBe(value);
    });
  });
});
