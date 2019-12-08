import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
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

    return next.handle(request);
  }
}
