import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Dot, DotsList, DotsService} from "../../../../services/dots/dots.service/dots.service.component";
import {Subscription} from "rxjs";
import {query} from "@angular/animations";


@Component({
  selector: 'app-dots-table',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './dots.table.component.html',
  styleUrl: './dots.table.component.css'
})
export class DotsTableComponent {

  displayedColumns: string[] = ['id', 'x', 'y', 'r', 'status', 'time'];
  dataSource!: MatTableDataSource<Dot>;

  private currentDotList: DotsList = {dots: []};

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dotsService: DotsService) {
    this.dotsService.getDots().subscribe((dots) => {
      this.currentDotList = dots;
      this.dataSource = new MatTableDataSource(this.currentDotList.dots);
      this.dataSource.sort = this.sort;
    });
  }
}

