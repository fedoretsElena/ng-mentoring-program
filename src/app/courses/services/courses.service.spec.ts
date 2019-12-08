import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { skip } from 'rxjs/operators';

import { courses } from '../mocks';
import { Course, ICourse, IExtendedCourse } from '../entitites';
import { CoursesService } from './courses.service';
import { ApiConfig } from '../../core/services';
import { of } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  const mockCourseResponse: Readonly<Partial<IExtendedCourse>> = {
    id: 1,
    name: 'Hello Kitty',
    length: 56,
    date: '12/12/2004',
    description: null,
    isTopRated: false,
    authors: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(CoursesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call getList after each changes inside filters or removing items', () => {
    const spy = spyOn(service, 'getList').and.returnValue(of([]));
    const filters = {count: 5, start: 1, textFragment: 'test11'};

    service.courses$.subscribe();
    service.onFiltersChange(filters);

    expect(spy).toHaveBeenCalled();
  });

  it('should spread changes after call', (done) => {
    const filters = {count: 5, start: 1};

    service.filters$
      .pipe(
        skip(1)
      )
      .subscribe((res) => {
        expect(res).toEqual(filters);
        done();
      });

    service.onFiltersChange(filters);
  });

  describe('getList()', () => {
    it('should return courses list', () => {
      service.getList().subscribe((list) => {
        expect(list.length).toBe(courses.length);
      });

      const req = httpMock.expectOne(`${ApiConfig.COURSES_BASE_URL}`);
      req.flush(courses);

      expect(req.request.method).toBe('GET');
    });

    it('should contain filter in params', () => {
      service.getList({count: 5}).subscribe((list) => {
        expect(list.length).toBe(courses.length);
      });

      const req = httpMock.expectOne(`${ApiConfig.COURSES_BASE_URL}?count=5`);
      req.flush(courses);

      expect(req.request.method).toBe('GET');
      expect(req.request.params.has('count')).toBeTruthy();
    });
  });

  describe('createCourse', () => {
    it('should return created course', () => {
      const course = {title: 'test'} as ICourse;

      service.createCourse(course)
        .subscribe((res: IExtendedCourse) => expect(res.name).toBe(mockCourseResponse.name));

      const req = httpMock.expectOne(ApiConfig.COURSES_BASE_URL);
      req.flush(mockCourseResponse);

      expect(req.request.method).toBe('POST');
    });
  });


  describe('getItemById', () => {
    it('should return item from list using `id`', () => {
      const id = mockCourseResponse.id;

      service.getItemById(id)
        .subscribe((res: Course) => expect(res.title).toBe(mockCourseResponse.name));

      const req = httpMock.expectOne(ApiConfig.COURSES_BASE_URL + id);
      req.flush(mockCourseResponse);

      expect(req.request.method).toBe('GET');
    });

    it('should throw an error if item does not exist', () => {
      const courseId = 11;

      service.getItemById(courseId).subscribe(() => {
      }, (err) => {
        expect(err.toString()).toBe(`Error: Course with id ${courseId} does not exist.`);
      });

      const req = httpMock.expectOne(ApiConfig.COURSES_BASE_URL + courseId);
      req.error(new ErrorEvent(`Error: Course with id ${courseId} does not exist.`));
    });
  });

  describe('removeItem', () => {

    it('should delete from courses item with specific id', () => {
      const id = 13;

      service.removeItem(id)
        .subscribe();

      const req = httpMock.expectOne(ApiConfig.COURSES_BASE_URL + id);
      req.flush({});

      expect(req.request.method).toBe('DELETE');
    });
  });

  describe('updateItem', () => {

    it('should send path request for updates', () => {
      const course = {id: 1, title: 'test'} as ICourse;

      service.updateItem(course)
        .subscribe((res: IExtendedCourse) => expect(res).toBeDefined());

      const req = httpMock.expectOne(ApiConfig.COURSES_BASE_URL + course.id);
      req.flush(mockCourseResponse);

      expect(req.request.method).toBe('PATCH');
    });
  });
});
