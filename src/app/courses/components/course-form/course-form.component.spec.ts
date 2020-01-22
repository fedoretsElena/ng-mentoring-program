import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CourseFormComponent } from './course-form.component';
import { SharedModule } from '../../../shared';
import { Course } from '../../entitites';
import { AppState } from '../../../core/store';

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
      }, {
        provide: TranslateService,
        useValue: { get: (() => '') }
      }],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        TranslateModule
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
    // it('should dispatch updateCourse if it is editing mode', () => {
    //   const course = { ...mockCourse, authors: []};
    //   const updateSpy = spyOn(mockStore, 'dispatch');
    //   component.isCreateMode = false;
    //   component.courseForm = {
    //    ...course,
    //     authors: null
    //   };
    //
    //   component.onSubmit();
    //
    //   expect(updateSpy).toHaveBeenCalledTimes(1);
    //   expect(updateSpy).toHaveBeenCalledWith(updateCourse({course}));
    // });

    it('should dispatch addCourse if it is creating mode', () => {
      const course = {...mockCourse, authors: [{ id: 1, name: 'Ted Stoun' }]};
      const updateSpy = spyOn(mockStore, 'dispatch');
      component.isCreateMode = true;
      fixture.detectChanges();

      component.onSubmit(course);

      expect(updateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
