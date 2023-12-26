import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";

import {MatInputModule} from '@angular/material/input';
import {Dot, DotsList, DotsService} from "../../../../services/dots/dots.service/dots.service.component";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DotsManagerComponent} from "../../../dots-manager/dots-manager.component";


export const PAGE_SIZE = 'PAGE_SIZE';

@Component({
  selector: 'app-dots-table',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, NgxPaginationModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dots.table.component.html',
  styleUrl: './dots.table.component.css',
})
@Injectable({
  providedIn: 'root'
})
export class DotsTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'x', 'y', 'r', 'status', 'time'];
  dataSource!: MatTableDataSource<Dot>;
  currentDotList: DotsList = {currentPage: 0, totalItems: 0, totalPages: 0, dots: []};
  pageIndex = 1;//текущая страница
  count = 0;//сколько всего элементов
  pageSize = 3;//размер текущей страницы
  pageSizes = [3, 6, 9];//Какие размерности можно выбрать
  totalPages = 0;//Скоько всего страниц



  ngOnInit(): void {
    localStorage.setItem(PAGE_SIZE,"3")
    this.dotsManager.pageIndex$.subscribe((newIndex) => {
      console.log("new Index",newIndex)
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dotsService: DotsService,
              private dotsManager: DotsManagerComponent) {
    this.dotsService.getDots().subscribe((dots) => {

      this.currentDotList = dots;
      this.pageIndex=dots.currentPage;
      this.count=dots.totalItems;
      this.totalPages=dots.totalPages;

      this.dataSource = new MatTableDataSource(this.currentDotList.dots);
      this.dataSource.sort = this.sort;
    });
  }

  retrieveTutorials(): void {
    this.dotsService.getDotsWithData((this.pageIndex),parseFloat(localStorage.getItem(PAGE_SIZE)!))
      .subscribe(
        (dots) => {
          this.currentDotList = dots;
          this.pageIndex=dots.currentPage;
          this.count=dots.totalItems;
          this.totalPages=dots.totalPages;
          this.dataSource = new MatTableDataSource(this.currentDotList.dots);
          this.dataSource.sort = this.sort;

        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.retrieveTutorials();
  }

  handlePageSizeChange(event: any): void {
      localStorage.setItem(PAGE_SIZE,event.target.value)
      console.log("Handle page size Change",event.target.value)
      this.pageIndex = 0;
      ///
      this.dotsManager.setPageIndex(0);
      ///
      this.retrieveTutorials();
  }

  checkTotalPageView(){
    if(this.totalPages==0){
      this.totalPages=1;
    }
    if(this.totalPages==this.pageIndex){
      this.pageIndex--;
    }
  }
  checkPageSizeView(){
    console.log("checkPageSizeView",localStorage.getItem(PAGE_SIZE))
    let r=parseFloat(localStorage.getItem(PAGE_SIZE)!);
    if(r==this.currentDotList.dots.length){
      this.totalPages++;
    }
  }

  goToSubmit(resultX:number, resultY:number, currentR:number){
    console.log("submit",localStorage.getItem(PAGE_SIZE))
    let r=localStorage.getItem(PAGE_SIZE);
    parseFloat(r!);
    this.checkTotalPageView();
    this.checkPageSizeView();
    this.dotsService.onSubmitCoordinateForm(resultX, resultY, currentR,this.totalPages-1,parseFloat(r!));
  }
}

