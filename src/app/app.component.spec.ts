import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { AuthService } from './core/services';
import { of } from 'rxjs';

class MockAuthService {
  isAuth$() {
    return of(true);
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([{
          path: 'auth/login',
          component: AppComponent
        }])
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: AuthService,
        useClass: MockAuthService
      }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
