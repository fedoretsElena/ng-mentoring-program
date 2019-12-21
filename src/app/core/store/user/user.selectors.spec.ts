import { UserState } from './user.state';
import { getUser } from './user.selectors';

const createUserState = ({
   data = null,
   error = null
 } = {}) => ({
  user: {
    data,
    error
  }
});

describe('Users selectors', () => {
  let state: { user: UserState };

  beforeEach(() => {
    state = createUserState();
  });

  it('should return null if user doesnt exist', () => {
    expect(getUser(state)).toBeNull();
  });
});
