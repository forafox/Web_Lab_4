import {Component, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
import {jwtDecode, JwtPayload} from "jwt-decode/build/esm";
import {reqHeaders, USER_STORAGE_KEY, UserData} from "../../auth.service";
import {data} from "autoprefixer";


export const head = new HttpHeaders({
  'Authorization': 'Bearer: '+localStorage.getItem(USER_STORAGE_KEY)
})

export interface Dot{
  id: number;
  x: number;
  y: number;
  r: number;
  status: string;
  time: string;
  username: string;
}
export interface DotsList{
  dot : Dot[];
}

@Injectable({
  providedIn: 'root'
})
export class DotsService {


  constructor(private http: HttpClient) {

  }

   getDots(){
    return this.http.get<DotsList>('http://localhost:8080/api/v2/canvas/dots',{
      headers: head},).subscribe(
      data =>
     console.log("getDots: ",data)
    )

  }



}
