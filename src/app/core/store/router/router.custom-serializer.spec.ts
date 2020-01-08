import { getRouterParams } from './router.selector';
import { RouterState } from './router.state';

const createRouterState = ({
   state = {
     params: null,
     url: '',
     queryParams: {},
     fragment: ''
   },
   navigationId = 0
 } = {}) => ({
  router: {
    state,
    navigationId
  }
});

describe('Router selectors', () => {
  let state: RouterState;

  beforeEach(() => {
    state = createRouterState();
  });

  it('should return null if params empty', () => {
    expect(getRouterParams(state)).toBeNull();
  });
});
