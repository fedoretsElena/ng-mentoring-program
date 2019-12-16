import { inject, TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

import { of } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated$']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        }, {
          provide: Router,
          useValue: routerSpy
        },
        AuthGuard
      ]
    });

    service = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should inject AuthGuard', inject([AuthGuard], (authGuard: AuthGuard) => {
    expect(authGuard).toBeTruthy();
  }));

  it('should return true if user is authorized', (done) => {
    const routeSnapshot = { url: '/courses' } ;
    Object.defineProperty(authService, 'isAuthenticated$', {get: () => of(true)});
    spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(of(true));

    service.canActivate(null, routeSnapshot as RouterStateSnapshot).subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('should return false and navigate to login if user is not authorized', (done) => {
    const route = { path: '/courses' } ;
    Object.defineProperty(authService, 'isAuthenticated$', {get: () => of(false)});
    spyOnProperty(authService, 'isAuthenticated$', 'get').and.returnValue(of(false));

    service.canLoad(route).subscribe((res) => {
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
      expect(res).toBeFalsy();
      done();
    });
  });
});
