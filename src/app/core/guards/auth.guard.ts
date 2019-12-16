import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    state: RouterStateSnapshot): Observable<boolean> {
    return this.isUserAuthorized();
  }

  canLoad(
    route: Route
  ): Observable<boolean> {
    return this.isUserAuthorized();
  }

  private isUserAuthorized(): Observable<boolean> {

    return this.authService.isAuthenticated$
      .pipe(
        map((authorized) => {
          if (!authorized) {
            this.router.navigate(['/auth/login']);
            return false;
          }

          return true;
        })
      );
  }
}
