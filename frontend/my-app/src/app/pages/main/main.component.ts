import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "../components/footer/footer.component";
import {HeaderComponent} from "../components/header/header.component";

@Component({
  selector: 'app-main',
  standalone: true,
    imports: [CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
