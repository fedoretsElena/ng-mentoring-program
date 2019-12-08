import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { HttpInterceptor } from './http.interceptor';
import { AuthService } from './auth.service';
import { ApiConfig } from './api-config.service';

class MockAuthService {
  getToken() {
    return 'fsYs4543hgfF3sdHkhD2p1';
  }
}

describe('HttpInterceptor', () => {
  let service: HttpInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpInterceptor,
        {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptor,
        multi: true,
      }, {
        provide: AuthService,
        useClass: MockAuthService
      }]
    });

    service = TestBed.get(HttpInterceptor);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept HTTP requests', () => {
    it('should add Authorization to Headers',
      inject([HttpClient, HttpTestingController],
        (http: HttpClient, mock: HttpTestingController) => {
          http.get(ApiConfig.COURSES_BASE_URL)
            .subscribe(response => expect(response).toBeTruthy());

          const request = mock.expectOne((req) => req.headers.has('Authorization'));

          request.flush([]);

          mock.verify();
        }));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
