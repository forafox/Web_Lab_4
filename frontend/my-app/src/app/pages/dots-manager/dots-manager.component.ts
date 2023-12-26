import {Component, Injectable, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "../components/footer/footer.component";
import {CoordinateFormComponent} from "../components/canvas/coordinate-form/coordinate-form.component";
import {HeaderComponent} from "../components/header/header.component";
import {CanvasElementComponent} from "../components/canvas/canvas-element/canvas-element.component";
import {DotsTableComponent} from "../components/table/dots.table/dots.table.component";
import {DotsService} from "../../services/dots/dots.service/dots.service.component";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-dots-manager',
  standalone: true,
  imports: [CommonModule, FooterComponent, CoordinateFormComponent, HeaderComponent, CanvasElementComponent, DotsTableComponent],
  templateUrl: './dots-manager.component.html',
  styleUrl: './dots-manager.component.css'
})
@Injectable({
  providedIn: 'root',
})
export class DotsManagerComponent{

  constructor(private dotsService: DotsService) {

  }

  deleteDots(){
    this.dotsService.deleteDots();
  }

  private pageSizeSubject = new BehaviorSubject<number>(3);
  pageSize$ = this.pageSizeSubject.asObservable();

  private totalPageSubject = new BehaviorSubject<number>(3);
  totalPage$ = this.totalPageSubject.asObservable();

  private pageIndexSubject = new BehaviorSubject<number>(0);
  pageIndex$ = this.pageIndexSubject.asObservable();

  setPageSize(newPageSize: number): void {
    console.log("set Page Size",newPageSize)
    this.pageSizeSubject.next(newPageSize);
  }
  setTotalPage(newTotalPage: number): void {
    this.pageSizeSubject.next(newTotalPage);
  }
  setPageIndex(pageIndex: number): void {
    this.pageIndexSubject.next(pageIndex);
  }


}
