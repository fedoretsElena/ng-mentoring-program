import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CoursesService } from '../../../courses/services';
import { Course } from '../../../courses/entitites';
import { AppState } from '../../../core/store';
import { getCourseByUrl } from '../../../courses/store';

class MockCoursesService {
  currCourse = {};
}

const eventSubject = new ReplaySubject<RouterEvent>(1);
const routerMock = {
  events: eventSubject.asObservable(),
  url: '/courses/'
};

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  let mockStore: MockStore<AppState>;
  let mockCourseSelector: MemoizedSelector<AppState, Course>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      providers: [{
        provide: CoursesService,
        useClass: MockCoursesService
      }, {
        provide: Router,
        useValue: routerMock
      }, provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    mockStore = TestBed.get(Store);
    mockCourseSelector = mockStore.overrideSelector(getCourseByUrl, {} as Course);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call checkRoute() if route changed', () => {
    const spy = spyOn(component, 'checkRoute');
    const path = '/courses/new/';
    component.startListeningRouter();

    eventSubject.next(new NavigationEnd(1, path, path));

    expect(spy).toHaveBeenCalledWith(path);
  });


  describe('checkRoute()', () => {
    it('should include course title inside last route, if route has id param', () => {
      const url = '/courses/1';
      const course = new Course({id: 1, title: 'ZAQWSXC'});
      mockCourseSelector.setResult(course as Course);
      mockStore.refreshState();

      component.checkRoute(url);

      const lastRouteInx = component.routes.length - 1;

      expect(component.routes[lastRouteInx]).toBe(course.title);
    });

    it('should return length equal 1', () => {
      const url = '/courses/';

      component.checkRoute(url);

      expect(component.routes.length).toBe(1);
    });
  });
});
