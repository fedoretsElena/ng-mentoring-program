
import { RouterState } from './router';
import { CoursesState } from '../../courses/store';

export interface AppState {
  router: RouterState;
  courses: CoursesState;
}
