import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

export interface DotsList {
  dots: Dot[],
  currentPage: number,
  totalItems: number,
  totalPages: number;
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


  private dotsSubject = new BehaviorSubject<DotsList>({currentPage: 0, totalItems: 0, totalPages: 0, dots: []});
  dots$ = this.dotsSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getDots(): Observable<DotsList> {
    this.http.get<DotsList>('http://localhost:8080/api/v2/canvas/dotss'+'/0'+'/5').subscribe(dots => this.dotsSubject.next(dots));
    return this.dots$;
  }

  getDotsWithData(page: number,size: number): Observable<DotsList> {
    this.http.get<DotsList>('http://localhost:8080/api/v2/canvas/dotss/'+page.toString()+"/"+size.toString(),).subscribe(dots => this.dotsSubject.next(dots));
    return this.dots$;
  }

  deleteDots() {
    return this.http.delete('http://localhost:8080/api/v2/canvas/dots').subscribe(
      (data) => {
        console.log("The dots have been deleted!");
        this.getDots();
      })
  }

  onSubmitCoordinateForm(x: number, y: number, r: number,totalPage: number,pageSize: number) {
    // console.log("SUBMIT: ", x, " ", y, " ", r);
    return this.http.post('http://localhost:8080/api/v2/canvas/dot', {
      x,
      y,
      r,
    }).subscribe(
      data => {
        console.log("IN submit coordinate form",totalPage,pageSize)
        this.getDotsWithData(totalPage,pageSize).subscribe(dots => {
          // Обновляем данные или выполняем другие действия
          // Например, this.currentDotList = dots;
          // console.log("Updated dots: ", dots);
        });
      }
    );
  }


}
