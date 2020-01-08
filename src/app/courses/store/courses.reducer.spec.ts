import { initialCoursesState } from './courses.state';
import { coursesReducer } from './courses.reducer';
import {
  addCourseSuccess,
  deleteCourseSuccess,
  loadCourses,
  loadCoursesFailure,
  loadCoursesSuccess,
  updateCourseSuccess
} from './courses.actions';
import { Course } from '../entitites';

describe('Courses reducer', () => {
  let reducer;
  let initialState;

  beforeEach(() => {
    reducer = coursesReducer;
    initialState = initialCoursesState;
  });

  it('should return the default state', () => {

    expect(reducer(initialState, { type: undefined })).toBe(initialState);
  });

  it('should return the new state with loading true', () => {
    const newState = reducer(initialState, loadCourses);
    expect(newState.loading).toBeTruthy();
  });

  it('should add new courses to store', () => {
    const data = [{ id: 1 }, { id: 2 }] as Course[];
    const result = reducer(initialState, loadCoursesSuccess({data}));

    expect(result.loading).toBeFalsy();
    expect(Object.keys(result.entities).length).toBe(2);
  });

  it('should update course', () => {
    const course = { id: 2, title: 'Test' } as Course;
    const state = reducer({ ...initialState }, addCourseSuccess({ course }));
    const result = reducer({
      ...state
    }, updateCourseSuccess({ course: { ...course, title: 'Test2', authors: [] }}));

    expect(result.entities[course.id].title).toBe('Test2');
  });

  it('should remove course', () => {
    const course = { id: 2, title: 'Test' } as Course;
    const state = reducer({ ...initialState }, addCourseSuccess({ course }));

    expect(Object.keys(state.ids).length).toBe(1);

    const result = reducer({
      ...state
    }, deleteCourseSuccess({ id: course.id }));

    expect(Object.keys(result.ids).length).toBe(0);
  });

  it('should return error in state', () => {
    const error = 'Error';
    const newState = reducer(initialState, loadCoursesFailure({ error }));
    expect(newState.error).toBe(error);
  });
});
