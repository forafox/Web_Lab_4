import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasElementComponent} from "../canvas-element/canvas-element.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {reqHeaders} from "../../../../services/auth.service";



@Component({
  selector: 'app-coordinate-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './coordinate-form.component.html',
  styleUrl: './coordinate-form.component.css'
})
export class CoordinateFormComponent {
  selectedX: string = '';
  selectedY: string = '';
  selectedR: string = '';
  lastSelectedX: string = ''; // Дополнительная переменная
  lastSelectedR: string = ''; // Дополнительная переменная
  rValues = ['-2', '-1.5', '-1', '-0.5','0', '1', '1.5', '2'];
  xValues = ['-2', '-1.5', '-1', '-0.5','0', '1', '1.5', '2'];

  constructor(private canvasElement: CanvasElementComponent,
              private fb:FormBuilder,
              private http: HttpClient) {
  }

  getDots() {
    this.canvasElement.getDots();
  }

  handleCheckboxChange(type: string, value: string) {
    if (type === 'x') {
      this.selectedX = this.lastSelectedX === value ? '' : value;
      this.lastSelectedX = this.selectedX;
      this.form.patchValue({ x: this.selectedX });
    } else if (type === 'r') {
      this.selectedR = this.lastSelectedR === value ? '' : value;
      this.lastSelectedR = this.selectedR;
      this.form.patchValue({ r: this.selectedR });
    }
  }

  handleYInputChange(event: any) {
    // Update selectedY when the user enters a value
    this.selectedY = event.target.value;
    this.form.patchValue({ y: event.target.value});
  }

  form =this.fb.nonNullable.group({
    x:[this.selectedX,[Validators.required]],
    y: [this.selectedY,[Validators.required,Validators.maxLength(6)]],
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
      data =>
        console.log("saveDot! : ", data)
    );
  }
}
