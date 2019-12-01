import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { of, throwError } from 'rxjs';

import { CourseResolver } from './course.resolver';
import { CoursesService } from '../services';
import { Course } from '../entitites';

describe('CourseResolver', () => {
  let service: CourseResolver;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;

  let route: ActivatedRoute;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const coursesSpy = jasmine.createSpyObj('CoursesService', ['getItemById']);
    const routerValueSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: CoursesService,
        useValue: coursesSpy
      }, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: convertToParamMap({id: '2'})
          }
        }
      }, {
        provide: Router,
        useValue: routerValueSpy
      }
      ]
    });

    service = TestBed.get(CourseResolver);
    coursesServiceSpy = TestBed.get(CoursesService);

    route = TestBed.get(ActivatedRoute);
    routerSpy = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getItemById() after resolve', () => {
    coursesServiceSpy.getItemById.and.returnValue(of(new Course()));

    service.resolve(route.snapshot).subscribe();

    expect(coursesServiceSpy.getItemById).toHaveBeenCalled();
  });

  it('should redirect to courses if there is no such item', () => {
    coursesServiceSpy.getItemById.and.returnValue(throwError('There is no such product'));

    service.resolve(route.snapshot).subscribe();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
  });
});

