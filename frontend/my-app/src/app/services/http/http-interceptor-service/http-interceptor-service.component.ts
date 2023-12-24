import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService, USER_STORAGE_KEY, USER_STORAGE_REFRESH_KEY} from '../../auth.service';
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Injectable({
  providedIn: 'root'
})
export class NoopInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
  private router: Router,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem(USER_STORAGE_KEY);

    if (!!token && !req.url.includes("/refreshtoken") && !req.url.includes("/register") && !req.url.includes("/auth")) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      return next.handle(authReq).pipe(
        catchError((error) => {
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
      return next.handle(req).pipe(
        catchError((error)=>{
          // alert(error.error)
          return throwError(error);
        })
      )
    }
  }

  private handleErrorResponse(error: any, req: HttpRequest<any>, next: HttpHandler): any {

    if ([401].includes(error.status)) {
      console.log("Unauthorized request");

      return this.auth.refreshToken(localStorage.getItem(USER_STORAGE_REFRESH_KEY)).pipe(
        switchMap(() => {
          console.log("Refresh access", req);
          let authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem(USER_STORAGE_KEY))
          });
          console.log("Refresh access2", authReq);
          return next.handle(authReq);
        })
      ).subscribe(
        (result) => {
          console.log("Token refreshed successfully");
        },
        (error) => {
          console.error("Error refreshing token");
          this.auth.signOut();
          this.router.navigate(['/']);
        }
      );
    }
    }
  }

