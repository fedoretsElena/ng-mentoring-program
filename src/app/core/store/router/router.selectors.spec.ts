import { RouterStateSnapshot } from '@angular/router';

import { CustomSerializer } from './router.custom-serializer';

describe('CustomSerializer', () => {
  let serializer: CustomSerializer;

  beforeEach(() => {
    serializer = new CustomSerializer();
  });

  it('should return serialize params', () => {
    const route = {
      queryParams: {},
      params: {},
      fragment: ''
    };
    const routeState: RouterStateSnapshot = {
      url: '/courses',
      root: {
        ...route,
        firstChild: {
          ...route
        }
      }
    } as RouterStateSnapshot;

    const result = {
      url: routeState.url,
      queryParams: routeState.root.queryParams,
      params: routeState.root.params,
      fragment: routeState.root.fragment
    };

    expect(serializer.serialize(routeState)).toEqual(result);
  });
});
