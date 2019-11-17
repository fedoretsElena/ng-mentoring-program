import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';

import { of } from 'rxjs';
import { skip } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { mockUser } from '../mocks';
import { User } from '../entities';

class MockLocalStorageService {
  store = {};

  setItem(key, data) {
    this.store[key] = data;
  }

  getItem(key) {
    return this.store[key] || null;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: LocalStorageService,
        useClass: MockLocalStorageService
      }, {
        provide: Router,
        useClass: MockRouter
      }]
    });

    service = TestBed.get(AuthService);
    localStorage = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should save data to LS after login() emit', (done) => {
      const lsSpy = spyOn(localStorage, 'setItem');
      const expectedUserInfo = new User(mockUser);

      service.getUserInfo$
        .pipe(
          skip(1)
        )
        .subscribe((user: User) => {
          expect(user).toEqual(expectedUserInfo);
          done();
        });

      service.login({email: 'some@gm.com', password: 'qweasd23'});

      expect(lsSpy).toHaveBeenCalledWith('user', mockUser);
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

  describe('getUserInfo', () => {
    it('should return null if localStorage does not have userInfo', (done) => {

      service.getUserInfo$
        .subscribe((user) => {
          expect(user).toBeNull();

          done();
        });
    });
  });
});
