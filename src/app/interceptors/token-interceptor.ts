import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve the access token from wherever you have stored it
    const accessToken = localStorage.getItem('token');
    const orgId = localStorage.getItem('organizationId');
    // If an access token exists, clone the request and add the Authorization header with the bearer token
    if (accessToken) {
      if (orgId) {
        const authRequest = request.clone({
          headers: request.headers
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Organization-Id', orgId),
        });
        return next.handle(authRequest);
      } else {
        const authRequest = request.clone({
          headers: request.headers.set(
            'Authorization',
            `Bearer ${accessToken}`
          ),
        });
        return next.handle(authRequest);
      }
    }

    // If no access token exists, just pass the original request through to the next handler
    return next.handle(request);
  }
}
