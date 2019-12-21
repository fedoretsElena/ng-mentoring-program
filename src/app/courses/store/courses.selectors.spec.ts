import { getCourseByUrl, getCoursesLoading } from './courses.selectors';
import { CoursesState } from './courses.state';

const createCourseState = ({
    data = [],
    ids = [],
    entities = {},
    loading = false,
    error = null
 } = {}) => ({
  courses: {
    data,
    loading,
    error,
    ids,
    entities
  }
});

describe('Courses selectors', () => {
  let state: { courses: CoursesState };

  beforeEach(() => {
    state = createCourseState();
  });

  it('should return loading state', () => {
    expect(getCoursesLoading(state)).toBeFalsy();
  });

  xit('should return course from store, get id from route state', () => {
    expect(getCourseByUrl(state)).toBeDefined();
  });

});
