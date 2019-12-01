import { TestBed } from '@angular/core/testing';

import { skip } from 'rxjs/operators';

import { courses } from '../mocks';
import { Course, ICourse } from '../entitites';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return courses list', (done) => {
    service.getList().subscribe((list) => {
      expect(list.length).toBe(courses.length);
      done();
    });
  });


  describe('createCourse', () => {
    it('should add new course to beginning', (done) => {
      const course = {title: 'test'} as ICourse;

      service.courses$
        .pipe(
          skip(1)
        )
        .subscribe((list) => {
          expect(list[0].title).toBe('test');
          done();
        });

      service.createCourse(course).subscribe();
    });
  });


  describe('getItemById', () => {
    it('should return item from list using `id`', (done) => {
      const courseId = 1;

      service.getItemById(courseId).subscribe((course: Course) => {
        expect(course.id).toEqual(courseId);

        done();
      });
    });

    it('should throw an error if item does not exist', (done) => {
      const courseId = 11;

      service.getItemById(courseId).subscribe(() => {
      }, (err) => {
        expect(err.toString()).toBe(`Error: Course with id ${courseId} does not exist.`);
        done();
      });
    });
  });

  describe('removeItem', () => {

    it('should return null after delete item', (done) => {
      const id = 1;

      service.removeItem(id)
        .subscribe((res) => {
          expect(res).toBeNull();
          done();
        });
    });

    it('should delete from courses item with specific id', (done) => {
      const id = 1;

      service.courses$
        .pipe(
          skip(1)
        )
        .subscribe((list) => {
          expect(list.find(item => item.id === id)).toBeUndefined();
          done();
        });

      service.removeItem(id).subscribe();
    });
  });

  describe('updateItem', () => {

    it('should check is title correct in new updated item', (done) => {
      const title = 'Angular 8. Updates.';

      service.updateItem({ title, id: 1 })
        .subscribe((res) => {
          expect(res.title).toBe(title);
          done();
        });
    });
  });
});
