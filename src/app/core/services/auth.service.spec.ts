import { NavigationEnd, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { ApiConfig } from './api-config.service';
import { mockToken } from '../mocks';
import { User } from '../entities';
import { AppState, loadUser } from '../store';
import { getUser } from '../store/user/user.selectors';

class MockLocalStorageService {
  store = {};

  setItem(key, data) {
    this.store[key] = data;
  }

  getItem(key) {
    return this.store[key] || null;
  }

  removeAll() {
    this.store = {};
  }
}

class MockRouter {
  // Router
  public events = of(
    new NavigationEnd(
      0, 'http://localhost:4200/auth',
      'http://localhost:4200/auth/login')
  );
}

describe('AuthService', () => {
  let localStorage: LocalStorageService;
  let service: AuthService;
  let httpMock: HttpTestingController;

  let mockStore: MockStore<AppState>;
  let mockGetUserSelector: MemoizedSelector<AppState, User>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: LocalStorageService,
        useClass: MockLocalStorageService
      }, {
        provide: Router,
        useClass: MockRouter
      }, provideMockStore()]
    });

    service = TestBed.get(AuthService);
    mockStore = TestBed.get(Store);
    mockGetUserSelector = mockStore.overrideSelector(getUser, null);
    localStorage = TestBed.get(LocalStorageService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should dispatch loadUser action with token after successful login', () => {
      const storeSpy = spyOn(mockStore, 'dispatch');
      const token = mockToken;

      service.login({ login: 'some@gm.com', password: 'qweasd23' }) .subscribe();

      const req = httpMock.expectOne(ApiConfig.LOGIN_URL);
      expect(req.request.method).toBe('POST');
      req.flush({ token });

      expect(storeSpy).toHaveBeenCalledWith(loadUser({token}));
    });
  });

  describe('getUser', () => {
    it('should save data to LS after success getUser request', (done) => {
      const lsSpy = spyOn(localStorage, 'setItem');
      const mockUser = {
        fakeToken: mockToken,
        id: 1
      };

      mockGetUserSelector.setResult(
        new User({ id: 1, name: { first: 'Fedor', last: 'Dud' }})
      );
      mockStore.refreshState();

      service.getUser('fsgEgrqv5tfgqG4rtgG')
      .subscribe(() => {

        service.isAuthenticated$.subscribe((res) => {
          expect(res).toBeTruthy();
          done();
        });
      });

      const req = httpMock.expectOne(ApiConfig.USER_INFO_URL);
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);

      expect(lsSpy).toHaveBeenCalledWith('user', mockUser);
      expect(lsSpy).toHaveBeenCalledWith('token', mockUser.fakeToken);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if localStorage contain token', () => {
      localStorage.setItem('token', 'adsj6dsadFDS145fsd');

      expect(service.isAuthenticated()).toBeTruthy();
    });
  });

  describe('isAuth$', () => {
    it('should return true if path contain auth', (done) => {

      service.isAuth$()
      .subscribe((flag: boolean) => {
        expect(flag).toBeTruthy();

        done();
      });
    });
  });

  describe('logout', () => {
    it('should reset localStorage', () => {
      const lsSpy = spyOn(localStorage, 'removeAll');

      service.logout();

      expect(lsSpy).toHaveBeenCalled();
      expect(service.isAuthenticated()).toBeFalsy();
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      const token = mockToken;

      localStorage.setItem('token', token);

      expect(service.getToken()).toBe(token);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
