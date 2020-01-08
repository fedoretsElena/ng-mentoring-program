import { userReducer } from './user.reducer';
import { initialUserState } from './user.state';
import { deleteUser, loadUserSuccess } from './user.actions';
import { User } from '../../entities';


describe('Courses reducer', () => {
  let reducer;
  let initialState;

  beforeEach(() => {
    reducer = userReducer;
    initialState = initialUserState;
  });

  it('should return the default state', () => {

    expect(reducer(initialState, { type: undefined })).toBe(initialState);
  });

  it('should save user to store', () => {
    const mockUser = { id: 1 } as User;
    const newState = reducer(initialState, loadUserSuccess({data: mockUser }));

    expect(newState.data.id).toBe(mockUser.id);
  });

  it('should delete user from store', () => {
    const newState = reducer(initialState, deleteUser());

    expect(newState.data).toBeNull();
  });
});
