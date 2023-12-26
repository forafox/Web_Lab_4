import {Component, Injectable} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanvasElementComponent} from "../canvas-element/canvas-element.component";
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {DotsService} from "../../../../services/dots/dots.service/dots.service.component";
import {DataServiceComponent} from "../canvas-element/data-service/data-service.component";
import {DotsTableComponent} from "../../table/dots.table/dots.table.component";


@Component({
  selector: 'app-coordinate-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './coordinate-form.component.html',
  styleUrl: './coordinate-form.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class CoordinateFormComponent {
  selectedX: number = 0;
  selectedXNull: boolean = false;
  selectedY: number = 0;
  selectedR: number = 0;
  selectedRNull: boolean = false;
  lastSelectedX: number = 0;
  lastSelectedR: number = 0;
  rValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
  xValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

  constructor(private canvasElement: CanvasElementComponent,
              private fb: FormBuilder,
              private http: HttpClient,
              private dotsService: DotsService,
              private dataService: DataServiceComponent,
              private dotsTable : DotsTableComponent
  ) {
  }

  handleCheckboxChange(type: string, value: number,id: string) {
    if (type === 'x') {
      this.selectedX = this.lastSelectedX === value ? 0 : value;
      this.lastSelectedX = this.selectedX;
      if(id==='x-0' && !this.selectedXNull){
        this.selectedXNull=true;
      }else {
        this.selectedXNull=false;
      }
      this.form.patchValue({x: this.selectedX});
    } else if (type === 'r') {
      this.selectedR = this.lastSelectedR === value ? 0 : value;
      this.lastSelectedR = this.selectedR;
      if(id==='r-0' && !this.selectedRNull){
        this.selectedRNull=true;
      }else {
        this.selectedRNull=false;
      }
      this.form.patchValue({r: this.selectedR});
      this.dataService.updateData(this.selectedR);
    }
  }

  markAsTouched() {
    this.xControl().markAsTouched();
    this.rControl().markAsTouched();
  }

  handleYInputChange(event: any) {
    // Update selectedY when the user enters a value
    this.selectedY = event.target.value;
    this.form.patchValue({y: parseFloat(event.target.value)});
  }

  onSubmitForm() {

    this.markAsTouched();

    if (this.form.invalid) {
      return;
    } else {

      const {x, y, r} = this.form.getRawValue();

      // this.dotsTable.checkTotalPageView();
      // this.dotsTable.checkPageSizeView();
      this.dotsTable.goToSubmit(x,y,r)
      // this.dotsService.onSubmitCoordinateForm(x, y, r,this.dotsTable.totalPages-1,this.dotsTable.pageSize)
    }
  }


  numberValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const value = group.value;
    // Попробуем преобразовать значение в число
    const numericValue = parseFloat(value);

    // Проверка, является ли значение числом
    if (isNaN(numericValue)) {
      return {notANumber: true};
    }
    // Convert the numeric value to a string for maxLength validation
    const stringValue = numericValue.toString();
    if (stringValue.length > 6) {
      return {maxLength: true};
    }

    return null; // Валидация прошла успешно
  };


  xValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Проверка, что хотя бы один чекбокс выбран
    if ((!value && !this.selectedXNull)|| value.length === 0) {
      return {noXSelected: true};
    }

    return null; // Валидация прошла успешно
  };
  rValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Проверка, что хотя бы один чекбокс выбран
    if ((!value && !this.selectedRNull)|| value.length === 0) {
      return {noRSelected: true};
    }

    return null; // Валидация прошла успешно
  };

  yValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const value = parseFloat(group.value);

    const isValid = -5 < value && value < 3;

    if (!isValid) {
      return {invalidValue: true};
    }

    return null; // Валидация прошла успешно
  };

  form = this.fb.nonNullable.group({
    x: [0, [Validators.required, this.xValidator]],
    y: [0, [Validators.required, this.yValidator, Validators.maxLength(6), this.numberValidator]],
    r: [0, [Validators.required, this.rValidator]],
  }, {updateOn: 'blur'});
  error = '';


  yControl = () => this.form.controls.y;
  xControl = () => this.form.controls.x;
  rControl = () => this.form.controls.r;

  getYErrorMessage() {
    const maxLengthError = this.yControl().hasError('maxLength');
    const notANumber = this.yControl().hasError('notANumber');
    const invalidValue = this.yControl().hasError('invalidValue');

    if (invalidValue) {
      return "Y value is not in (-5,3)";
    } else if (notANumber) {
      return 'Y number is required';
    } else if (maxLengthError) {
      return 'Y value must be no more than 6 characters'
    }
    return '';
  }

  getXErrorMessage() {
    const noXSelected = this.xControl().hasError('noXSelected');

    if (noXSelected) {
      return " Please select at least one X value";
    }
    return '';
  }

  getRErrorMessage() {
    const noRSelected = this.rControl().hasError('noRSelected');

    if (noRSelected) {
      return " Please select at least one R value";
    }
    return '';
  }


}
