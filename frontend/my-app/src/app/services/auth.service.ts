import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, filter, map, Observable, switchMap} from "rxjs";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {Router, UrlTree} from "@angular/router";

export const USER_STORAGE_KEY = 'APP_TOKEN';

export let reqHeaders = new HttpHeaders({
  'Authorization': 'Bearer ' + localStorage.getItem(USER_STORAGE_KEY)
})

export interface UserData {
  token: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  updateHeader() {
    console.log("HEADER updated. Old value", reqHeaders.get('Authorization'));
    reqHeaders.set('Authorization', 'Bearer ' + localStorage.getItem(USER_STORAGE_KEY));
    console.log("HEADER updated. New value", reqHeaders.get('Authorization'));
  }

  private user: BehaviorSubject<UserData | null | undefined> =
    new BehaviorSubject<UserData | null | undefined>(undefined);

  constructor(private http: HttpClient) {

    this.loadUser();
  }

  loadUser() {
    const token = localStorage.getItem(USER_STORAGE_KEY);
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);

      const userData: UserData = {
        token: token,
        id: decoded.sub!
      };
      this.user.next(userData);
    } else {
      this.user.next(null);
    }
  }

  register(username: string, password: string, age: string, email: string) {

    // const reqHeaders = new HttpHeaders({
    //   'Authorization': 'Bearer '+localStorage.getItem(USER_STORAGE_KEY),
    // });

    return this.http
      .post('http://localhost:8080/api/v1/auth/register', {
        username,
        password,
        age,
        email
      },)
      .pipe(
        switchMap((res: any) => {
          return this.login(username, password, age, email);
        })
      );
  }


  login(username: string, password: string, age: string, email: string) {

    // const reqHeaders = new HttpHeaders({
    //   // Добавление Authorization заголовка
    //   'Authorization': 'Bearer '+localStorage.getItem(USER_STORAGE_KEY),
    // });

    return this.http.post('http://localhost:8080/api/v1/auth/auth', {
      username,
      password,
      age,
      email
    },).pipe(
      map((res: any) => {
        console.log("Result: ", res);
        localStorage.setItem(USER_STORAGE_KEY, res.token);
        this.updateHeader();
        const decoded = jwtDecode<JwtPayload>(res.token);

        const userData: UserData = {
          token: res.token,
          id: decoded.sub!
        }
        this.user.next(userData);

        return userData;
      }));
  }

  signOut() {
    this.setLoggedIn(false);
    localStorage.removeItem(USER_STORAGE_KEY);
    this.user.next(null);
  }

  getCurrentUser() {
    return this.user.asObservable();
  }

  getCurrentUserId() {
    // return true;
    //TEST
    return this.user.getValue()!.id;
  }

  isLoggedIn(): Observable<boolean | UrlTree> {
    const router = inject(Router);

    return this.getCurrentUser().pipe(
      filter((user) => user !== undefined),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          this.setLoggedIn(true);
          return true;
        } else {
          // В случае, если пользователь не зарегистрирован, то вернутся на
          return router.createUrlTree(['/auth']);
        }
      })
    )
  }

  shouldLogIn(): Observable<boolean | UrlTree> {
    const router = inject(Router);

    return this.getCurrentUser().pipe(
      filter((user) => user !== undefined),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          //В случае, если пользователь зарегистрирован, то вернутся на
          this.setLoggedIn(true);
          return router.createUrlTree(['/dashboard']);
        } else {
          return true;
        }
      })
    )
  }

}
