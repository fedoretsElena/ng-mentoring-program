import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';

import { IUser, User } from '../entities';
import { LocalStorageService } from './local-storage.service';
import { ApiConfig } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'user';
  private readonly TOKEN_KEY = 'token';

  private userSink: BehaviorSubject<User>
    = new BehaviorSubject(this.getInitialUser());

  getUserInfo$: Observable<User> = this.userSink.asObservable();
  isAuthenticated$: Observable<boolean> = this.getUserInfo$
    .pipe(
      map(user => !!user)
    );

  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) {
  }

  getToken(): string {
    return this.localStorage.getItem(this.TOKEN_KEY);
  }

  isAuth$(): Observable<boolean> {
    return this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        pluck('url'),
        map((url: string) => url.includes('auth'))
      );
  }

  login(data: { login: string, password: string }): Observable<User> {
    return this.http.post(ApiConfig.LOGIN_URL, data)
      .pipe(
        pluck('token'),
        switchMap((token: string) => this.getUser(token))
      );
  }

  getUser(token: string): Observable<User> {
    return this.http.post(ApiConfig.USER_INFO_URL, {token})
      .pipe(
        tap((user: IUser) => this.localStorage.setItem(this.USER_KEY, user)),
        tap(({ fakeToken }) => this.localStorage.setItem(this.TOKEN_KEY, fakeToken)),
        map((user: IUser) => new User(user)),
        tap((user: User) => this.userSink.next(user))
      );
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
