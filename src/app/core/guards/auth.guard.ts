import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isUserAuthorized(state.url);
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isUserAuthorized(route.path);
  }

  private isUserAuthorized(path: string): boolean {
    const authorized = this.authService.isAuthenticated();
    const isLoginPage = path.indexOf('auth') !== -1;

    if (!authorized && !isLoginPage) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
