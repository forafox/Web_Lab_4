import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasElementComponent} from "../canvas-element/canvas-element.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {reqHeaders} from "../../../../services/auth.service";
import {DotsService} from "../../../../services/dots/dots.service/dots.service.component";
import {DataServiceComponent} from "../canvas-element/data-service/data-service.component";



@Component({
  selector: 'app-coordinate-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './coordinate-form.component.html',
  styleUrl: './coordinate-form.component.css'
})
export class CoordinateFormComponent {
  selectedX: number = 0;
  selectedY: number = 0;
  selectedR: number = 0;
  lastSelectedX: number = 0; // Дополнительная переменная
  lastSelectedR: number = 0; // Дополнительная переменная
  rValues = [-2, -1.5, -1, -0.5,0, 1, 1.5, 2];
  xValues = [-2, -1.5, -1, -0.5,0,1, 1.5, 2];

  constructor(private canvasElement: CanvasElementComponent,
              private fb:FormBuilder,
              private http: HttpClient,
              private dotsService: DotsService,
              private dataService: DataServiceComponent
              ) {
  }

  getDots() {

  }

  handleCheckboxChange(type: string, value: number) {
    if (type === 'x') {
      this.selectedX = this.lastSelectedX === value ? 0 : value;
      this.lastSelectedX = this.selectedX;
      this.form.patchValue({ x: this.selectedX });
    } else if (type === 'r') {
      this.selectedR = this.lastSelectedR === value ? 0 : value;
      this.lastSelectedR = this.selectedR;
      this.form.patchValue({ r: this.selectedR });
      this.dataService.updateData(this.selectedR);
      // this.canvasElement.updateCurrentR(this.selectedR);
    }
  }


  handleYInputChange(event: any) {
    // Update selectedY when the user enters a value
    this.selectedY = event.target.value;
    this.form.patchValue({ y: parseFloat(event.target.value)});
  }

  form =this.fb.nonNullable.group({
    x:[this.selectedX,[Validators.required]],
    y:[this.selectedY,[Validators.required,Validators.maxLength(6)]],
    r:[this.selectedR,[Validators.required]],
  });
  error='';

  onSubmitCoordinateForm(){

    console.log("SUBMIT: ", this.form.value,"AND",this.selectedX);
    const {x,y,r} = this.form.getRawValue();

    return this.http.post('http://localhost:8080/api/v2/canvas/dot', {
      x,
      y,
      r,
    },{headers:reqHeaders}).subscribe(
      data => {
        console.log("saveDot! : ", data)
        this.dotsService.getDots().subscribe(dots => {
          // Обновляем данные или выполняем другие действия
          // Например, this.currentDotList = dots;
          // console.log("Updated dots: ", dots);
        });
      }
    );
  }

  getR(){
    return this.selectedR;
  }
}
