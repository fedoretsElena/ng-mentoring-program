import { inject, TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services';

let authorized = false;

class MockAuthService {
  isAuthenticated() {
    return authorized;
  }
}

describe('AuthGuard', () => {
  let service: AuthGuard;
  let authService: AuthService;

  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useClass: MockAuthService
        }, {
          provide: Router,
          useValue: routerSpy
        }
      ]
    });

    service = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should inject AuthGuard', inject([AuthGuard], (authGuard: AuthGuard) => {
    expect(authGuard).toBeTruthy();
  }));

  it('should return true if user is authorized', () => {
    const routeSnapshot = { url: '/courses' } ;
    authorized = true;

    expect(service.canActivate(null, routeSnapshot as RouterStateSnapshot)).toBeTruthy();
  });

  it('should return false and navigate to login if user is not authorized', () => {
    const route = { path: '/courses' } ;
    authorized = false;

    const result = service.canLoad(route);

    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    expect(result).toBeFalsy();
  });
});
