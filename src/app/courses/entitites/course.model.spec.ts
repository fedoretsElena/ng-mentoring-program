import { Course } from './course.model';

describe('CourseModel', () => {
  it('should create an instance with null id', () => {
    const course = new Course();

    expect(course.id).toBe(null);
  });

  it('should create an instance with id equal 1', () => {
    const course = new Course({
      id: 1
    });

    expect(course.id).toBe(1);
  });

  it('should create an instance with authors array if it defined inside options', () => {
    const course = new Course({
      authors: [{
        id: 1,
        name: 'Stasya',
        lastName: 'Levkina'
      }]
    });

    expect(course.authors[0].fullName).toBe('Stasya Levkina');
  });
});
