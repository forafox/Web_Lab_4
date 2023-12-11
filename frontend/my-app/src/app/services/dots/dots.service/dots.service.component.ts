import {Component, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {jwtDecode, JwtPayload} from "jwt-decode/build/esm";
import {reqHeaders, USER_STORAGE_KEY, UserData} from "../../auth.service";
import {data} from "autoprefixer";


export interface DotsList{
  dots : Dot[];
}


export interface Dot{
  id: number;
  x: number;
  y: number;
  r: number;
  status: string;
  time: string;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class DotsService {


  private dotsSubject = new BehaviorSubject<DotsList>({ dots: [] });
  dots$ = this.dotsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDots(): Observable<DotsList> {
    this.http.get<DotsList>('http://localhost:8080/api/v2/canvas/dots', {
      headers: reqHeaders,
    }).subscribe(dots => this.dotsSubject.next(dots));

    return this.dots$;
  }



}
