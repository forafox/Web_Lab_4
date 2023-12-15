import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "../components/footer/footer.component";
import {CoordinateFormComponent} from "../components/canvas/coordinate-form/coordinate-form.component";
import {HeaderComponent} from "../components/header/header.component";
import {CanvasElementComponent} from "../components/canvas/canvas-element/canvas-element.component";
import {DotsTableComponent} from "../components/table/dots.table/dots.table.component";
import {DotsService} from "../../services/dots/dots.service/dots.service.component";

@Component({
  selector: 'app-dots-manager',
  standalone: true,
  imports: [CommonModule, FooterComponent, CoordinateFormComponent, HeaderComponent, CanvasElementComponent, DotsTableComponent],
  templateUrl: './dots-manager.component.html',
  styleUrl: './dots-manager.component.css'
})
export class DotsManagerComponent {

  constructor(private dotsService: DotsService) {

  }


  deleteDots(){
    this.dotsService.deleteDots();
  }
}
