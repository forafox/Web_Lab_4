import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService, USER_STORAGE_KEY, USER_STORAGE_REFRESH_KEY} from '../../auth.service';


@Injectable({
  providedIn: 'root'
})
export class NoopInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem(USER_STORAGE_KEY);

    if (!!token && !req.url.includes("/refreshtoken")) {
      console.log("Adding authorization header")
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(authReq).pipe(
        catchError((error) => {
          // Handle errors here
          this.handleErrorResponse(error, req, next);
          return throwError(error);
        })
      );
    } else if (req.url.includes("/refreshtoken")) {
      console.log("Need to refresh JWT token.")

      return next.handle(req).pipe(
        catchError((error) => {
          // Handle errors here
          return next.handle(this.handleErrorResponse(error, req, next));
          // next.handle(this.handleErrorResponse(error, req, next));
          // return throwError(error);
        })
      );
    } else {
      console.log("Request with no token. Passing it on")
      return next.handle(req)
    }
  }

  private handleErrorResponse(error: any, req: HttpRequest<any>, next: HttpHandler): any {
    // Handle the error response here based on status code or any other criteria
    // Handle the response here
    const status = error.status;
    if ([401].includes(error.status)) {
      console.log("Unauthorized request");
      this.auth.refreshToken(localStorage.getItem(USER_STORAGE_REFRESH_KEY)).subscribe(
        (res) => {
          console.log("Refresh access", req)
          let authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem(USER_STORAGE_KEY))
          });
          console.log("Refresh access2", authReq)
          return next.handle(authReq);
          // return authReq;
        },
        (error) => {
          // Handle any error that occurred during the refresh
          console.error("Refresh error", error);
        }
      )
    }
    console.error(`HTTP respons e error with status code: ${status}`);
    return req;
  }
}
