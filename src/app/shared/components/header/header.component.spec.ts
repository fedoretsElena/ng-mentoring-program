import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo';
import { UserActionBarComponent } from '../user-action-bar';
import { AuthService } from '../../../core/services';
import { LangSelectComponent } from '../lang-select';
import { SelectComponent } from '../select';

class MockAuthService {
  isAuth$() {
    return of(true);
  }

  logout() {
    return of();
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        LogoComponent,
        LangSelectComponent,
        SelectComponent,
        UserActionBarComponent
      ],
      imports: [
        RouterTestingModule,
        TranslateModule
      ],
      providers: [{
        provide: AuthService,
        useClass: MockAuthService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
