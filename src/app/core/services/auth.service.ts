import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, pluck } from 'rxjs/operators';

import { User } from '../entities';
import { mockToken, mockUser } from '../mocks';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'user';
  private readonly TOKEN_KEY = 'token';

  private userSink: BehaviorSubject<User>
    = new BehaviorSubject(this.getInitialUser());

  getUserInfo$: Observable<User> = this.userSink.asObservable();

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
  ) {
  }

  isAuth$(): Observable<boolean> {
    return this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        pluck('url'),
        map((url: string) => url.includes('auth'))
      );
  }

  login(data: { email: string, password: string }): Observable<boolean> {
    // here will be http request
    this.localStorage.setItem(this.USER_KEY, mockUser);
    this.localStorage.setItem(this.TOKEN_KEY, mockToken);

    this.userSink.next(new User(mockUser));

    return of(true);
  }

  logout(): Observable<boolean> {
    this.localStorage.removeAll();
    this.userSink.next(null);

    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.localStorage.getItem(this.TOKEN_KEY);
  }

  private getInitialUser(): User | null {
    const user = this.localStorage.getItem(this.USER_KEY);

    return user ? new User(this.localStorage.getItem(this.USER_KEY)) : null;
  }
}
