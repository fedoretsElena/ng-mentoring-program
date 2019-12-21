import { User } from '../../entities';

function getInitialUser(): User | null {
  const user = JSON.parse(localStorage.getItem('user'));

  return user ? new User(user) : null;
}

export const initialUserState: UserState = {
  data: getInitialUser(),
  error: null
};

export interface UserState {
  data: User;
  error: string | null;
}
