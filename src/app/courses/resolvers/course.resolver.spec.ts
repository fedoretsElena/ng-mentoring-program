import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CourseResolver } from './course.resolver';
import { Course } from '../entitites';
import { getCourseByUrl } from '../store';
import { AppState } from '../../core/store';

describe('CourseResolver', () => {
  let service: CourseResolver;

  let mockStore: MockStore<AppState>;
  let mockCourseSelector: MemoizedSelector<AppState, Course>;

  let route: ActivatedRoute;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({id: '2'})
          }
        }
      },
        provideMockStore()
      ]
    });

    service = TestBed.get(CourseResolver);
    mockStore = TestBed.get(Store);
    mockCourseSelector = mockStore.overrideSelector(getCourseByUrl, {} as Course);

    route = TestBed.get(ActivatedRoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call store after resolve', () => {
    const course = new Course({id: 1, title: 'ZAQWSXC'});
    const storeSpy = spyOn(mockStore, 'select').and.returnValue(of(course));

    mockCourseSelector.setResult(course as Course);
    mockStore.refreshState();

    service.resolve(route.snapshot).subscribe();

    expect(storeSpy).toHaveBeenCalled();
  });
});

