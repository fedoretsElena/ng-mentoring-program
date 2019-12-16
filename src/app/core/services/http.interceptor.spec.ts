import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { HttpInterceptor } from './http.interceptor';
import { AuthService } from './auth.service';
import { ApiConfig } from './api-config.service';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

class MockAuthService {
  getToken() {
    return 'fsYs4543hgfF3sdHkhD2p1';
  }
}

const stubLoaderService = {
  onShow(state) {}
};

describe('HttpInterceptor', () => {
  let service: HttpInterceptor;
  let loaderService: LoaderService;
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
      }, {
        provide: LoaderService,
        useValue: stubLoaderService
      }]
    });

    service = TestBed.get(HttpInterceptor);
    loaderService = TestBed.get(LoaderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('intercept HTTP requests', () => {
    it('should add Authorization to Headers',
      inject([HttpClient, HttpTestingController],
        (http: HttpClient, mock: HttpTestingController) => {
          const spyLoading = spyOn(loaderService, 'onShow');

          http.get(ApiConfig.COURSES_BASE_URL)
            .pipe(
              finalize(() => expect(spyLoading).toHaveBeenCalled())
            )
            .subscribe(response => {
              expect(response).toBeTruthy();
              expect(spyLoading).toHaveBeenCalledWith(true);
            });

          const request = mock.expectOne((req) => req.headers.has('Authorization'));

          request.flush([]);

          mock.verify();
        }));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
