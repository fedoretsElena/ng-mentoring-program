import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared';
import { AuthService } from '../../../core/services';
import { User } from '../../../core/entities';

class MockAuthService extends AuthService {
  login(data) {
    return of({} as User);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,

        SharedModule
      ],
      providers: [{
        provide: AuthService,
        useClass: MockAuthService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login from authService after form submit', () => {
    const serviceSpy = spyOn(authService, 'login').and.returnValue(of({} as User));
    const routerSpy = spyOn(component.router, 'navigate');
    const loginForm = {
      password: 'qwerty123',
      login: 'test@fmail.com'
    };

    component.loginForm = loginForm;
    fixture.detectChanges();

    component.onSubmit(new Event('submit'));

    expect(serviceSpy).toHaveBeenCalledWith(loginForm);
    expect(routerSpy).toHaveBeenCalledWith(['/courses']);
  });

  it('should change form value after call onChange output', () => {
    const key = 'login';
    const value = 'test1';
    component.onChange(value, key);

    expect(component.loginForm[key]).toBe(value);
  });
});
