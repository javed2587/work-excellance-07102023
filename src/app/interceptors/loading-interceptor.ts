import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
    return next.handle(req).pipe(
      tap(
        event => {
          ok = event instanceof HttpResponse ? 'success' : ''
        },
        error => {
          ok = 'failure'
        }
      ),
      // tap(
      //   event => {
      //     if (event instanceof HttpResponse && event.status === 200) {
      //     }
      //   },
      //   error => {
      //     this.snackBar.open('Failure message', 'Close',
      //       { duration: 15000, verticalPosition: "top", panelClass: "mat-snack-bar-error" });
      //   }
      // ),
      tap(
        () => {
          const elapsed = Date.now() - started;
          console.log(`${req.method} ${req.urlWithParams} took ${elapsed} ms.`);
        },
        error => {
          console.error(error)
        }
      )
    );
  }
}
