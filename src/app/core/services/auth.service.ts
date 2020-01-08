import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, pluck, tap } from 'rxjs/operators';

import { IUser, User } from '../entities';
import { LocalStorageService } from './local-storage.service';
import { ApiConfig } from './api-config.service';
import { AppState } from '../store';
import { loadUser, deleteUser } from '../store/user/user.actions';
import { getUser } from '../store/user/user.selectors';

export const USER_KEY = 'user';
export const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<AppState>,
    private localStorage: LocalStorageService,
  ) {
  }
  getUserInfo$: Observable<User> = this.store.select(getUser);
  isAuthenticated$: Observable<boolean> = this.getUserInfo$
    .pipe(
      map(user => !!user)
    );

  getToken(): string {
    return this.localStorage.getItem(TOKEN_KEY);
  }

  isAuth$(): Observable<boolean> {
    return this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        pluck('url'),
        map((url: string) => url.includes('auth'))
      );
  }

  login(data: { login: string, password: string }): Observable<string> {
    return this.http.post(ApiConfig.LOGIN_URL, data)
      .pipe(
        pluck('token'),
        tap((token: string) => this.store.dispatch(loadUser({ token })))
      );
  }

  getUser(token: string): Observable<User> {
    return this.http.post(ApiConfig.USER_INFO_URL, {token})
      .pipe(
        tap((user: IUser) => this.localStorage.setItem(USER_KEY, user)),
        tap(({ fakeToken }) => this.localStorage.setItem(TOKEN_KEY, fakeToken)),
        map((user: IUser) => new User(user))
      );
  }

  logout(): Observable<boolean> {
    this.localStorage.removeAll();
    this.store.dispatch(deleteUser());

    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.localStorage.getItem(TOKEN_KEY);
  }
}
