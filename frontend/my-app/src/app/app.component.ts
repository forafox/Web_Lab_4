import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./pages/login/login.component";
import {HeaderComponent} from "./pages/components/header/header.component";
import {OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    LoginComponent,
    HttpClientModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'routing-app';
}
