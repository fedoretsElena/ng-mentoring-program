import { SearchByPipe } from './search-by.pipe';
import { courses } from '../mocks';

describe('SearchByPipe', () => {
  let pipe;
  let coursesList;

  beforeEach(() => {
    pipe = new SearchByPipe();
    coursesList = [...courses];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return one course if search equal "Angular"', () => {
    const search = 'Angular';

    expect(pipe.transform(coursesList, search).length).toEqual(1);
  });

  it('should return all list if search is null', () => {
    expect(pipe.transform(coursesList, null).length).toEqual(coursesList.length);
  });
});
