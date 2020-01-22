import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { UserActionBarComponent } from './user-action-bar.component';
import { AuthService } from '../../../core/services';

class MockAuthService {
  isAuth$() {
    return of(true);
  }

  logout() {
    return of(null);
  }
}

describe('UserActionBarComponent', () => {
  let component: UserActionBarComponent;
  let fixture: ComponentFixture<UserActionBarComponent>;

  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    const routerValueSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [UserActionBarComponent],
      imports: [
        RouterTestingModule,
        TranslateModule
      ],
      providers: [{
        provide: AuthService,
        useClass: MockAuthService
      }, {
        provide: Router,
        useValue: routerValueSpy
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionBarComponent);
    authService = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout() from AuthService', () => {
    const logoutSpy = spyOn(authService, 'logout').and.returnValue(of());

    component.logout();

    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should call log msg and redirect to [auth/login] after logout', () => {
    const logSpy = spyOn(console, 'log');

    component.logout();

    expect(logSpy).toHaveBeenCalledWith('Logout.');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
  });
});
