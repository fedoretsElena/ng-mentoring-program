import { OrderByPipe } from './order-by.pipe';
import { courses } from '../mocks';

describe('OrderByPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return course with id equal 3', () => {
    const mockCourses = [...courses];
    const oldestCourse = pipe.transform(mockCourses).shift();

    expect(oldestCourse.id).toBe(3);
  });

  it('should return empty array if value does not exist', () => {
    expect(pipe.transform(null)).toEqual([]);
  });
});
