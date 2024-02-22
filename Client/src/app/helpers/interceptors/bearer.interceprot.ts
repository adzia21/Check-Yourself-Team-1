import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private currentUserToken: string | null = localStorage.getItem('token');

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.currentUserToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUserToken}`
        }
      })
    }

    return next.handle(request);
  }
}