import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FooterComponent} from "../components/footer/footer.component";
import {HeaderComponent} from "../components/header/header.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, NgOptimizedImage, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
