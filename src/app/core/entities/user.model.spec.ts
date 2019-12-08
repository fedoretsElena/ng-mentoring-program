import { User } from './user.model';


describe('UserMode;', () => {
  it('should create an instance with null id', () => {
    const user = new User();

    expect(user.id).toBe(null);
  });

  it('should create an instance with id equal 1', () => {
    const course = new User({
      id: 1
    });

    expect(course.id).toBe(1);
  });

  it('should return concatenated fullName', () => {
    const first = 'Oleh';
    const last = 'Vinnik';
    const expected = `${first} ${last}`;
    const user = new User({
      id: 1,
      name: {
        first,
        last
      }
    });

    expect(user.fullName).toEqual(expected);
  });
});
