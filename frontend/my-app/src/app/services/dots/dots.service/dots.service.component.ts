import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

export interface DotsList {
  dots: Dot[];
}


export interface Dot {
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


  private dotsSubject = new BehaviorSubject<DotsList>({dots: []});
  dots$ = this.dotsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getDots(): Observable<DotsList> {
    this.http.get<DotsList>('http://localhost:8080/api/v2/canvas/dots').subscribe(dots => this.dotsSubject.next(dots));
    return this.dots$;
  }

  onSubmitCoordinateForm(x: number, y: number, r: number) {
    console.log("SUBMIT: ", x, " ", y, " ", r);
    return this.http.post('http://localhost:8080/api/v2/canvas/dot', {
      x,
      y,
      r,
    }).subscribe(
      data => {
        console.log("saveDot! : ", data)
        this.getDots().subscribe(dots => {
          // Обновляем данные или выполняем другие действия
          // Например, this.currentDotList = dots;
          // console.log("Updated dots: ", dots);
        });
      }
    );
  }


}
