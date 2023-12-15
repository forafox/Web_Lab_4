import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./pages/login/login.component";
import {HeaderComponent} from "./pages/components/header/header.component";
import {MainComponent} from "./pages/main/main.component";
import {DotsManagerComponent} from "./pages/dots-manager/dots-manager.component";
import {DotsTableComponent} from "./pages/components/table/dots.table/dots.table.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    DotsManagerComponent,
    DotsTableComponent,
    MatTableModule, MatSortModule, MatPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'routing-app';
}
