import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared';
import { AuthService } from '../../../core/services';
import { mockToken } from '../../../core/mocks';

class MockAuthService extends AuthService {
  login(data) {
    return of(mockToken);
  }
}

class FakeTranslateLoader implements TranslateLoader {
  public getTranslation(_: any) {
    return of();
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
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader}
        }),
        HttpClientTestingModule,

        SharedModule
      ],
      providers: [{
        provide: AuthService,
        useClass: MockAuthService
      }, provideMockStore()]
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
    const serviceSpy = spyOn(authService, 'login').and.returnValue(of(mockToken));
    const loginForm = {
      password: 'qwerty123',
      login: 'test@fmail.com'
    };

    component.onSubmit(new Event('submit'), loginForm);

    expect(serviceSpy).toHaveBeenCalledWith(loginForm);
  });
});
