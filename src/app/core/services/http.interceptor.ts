import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url } = request;

    if (!url.includes('auth')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Authorization ${this.authService.getToken()}`
        }
      });
    }

    return next.handle(request).pipe(
      tap(() => this.loaderService.onShow(true)),
      delay(500),
      finalize(() => {
        this.loaderService.onShow(false);
      })
    );
  }
}
