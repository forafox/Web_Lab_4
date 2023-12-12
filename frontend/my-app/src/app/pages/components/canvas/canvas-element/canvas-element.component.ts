import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../../header/header.component";
import {FooterComponent} from "../../footer/footer.component";
import {Dot, DotsList, DotsService} from "../../../../services/dots/dots.service/dots.service.component";
import {CoordinateFormComponent} from "../coordinate-form/coordinate-form.component";
import {Subscription} from "rxjs";
import {DataServiceComponent} from "./data-service/data-service.component";

@Component({
  selector: 'app-canvas-element',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CoordinateFormComponent, CoordinateFormComponent],
  templateUrl: './canvas-element.component.html',
  styleUrl: './canvas-element.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class CanvasElementComponent implements OnInit {

  constructor(public dotsService: DotsService,
              private cdr: ChangeDetectorRef,
              private dataService: DataServiceComponent,
  ) {
  }

  #getDots() {
    this.dotsService.getDots();
  }

  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;

  private scaleX: number = 30;
  private scaleY: number = 30;
  canvasPlotWidth: number = 0;
  canvasPlotHeight: number = 0;
  private xAxis: number = 0;
  private yAxis: number = 0;

  private context!: CanvasRenderingContext2D;

  private currentDotList: DotsList = {dots: []};

  @Input() currentR: number = 0;

  //коэффициент смещения текста от осей
  shiftNames: number = 5;
  shiftAxisNames: number = 20;


  private dotsSubscription!: Subscription;

  ngOnInit(): void {

    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;

    this.context = canvas.getContext('2d')!;
    if (this.context) {

      this.dotsSubscription = this.dotsService.dots$.subscribe((dots) => {
        if (this.currentDotList !== dots) {
          this.currentDotList = dots;
          this.#draw();
        }
      });
      this.dataService.getData().subscribe((data) => {
        this.currentR = data;
        this.#draw();
      });

      canvas.addEventListener('click', (event) => this.handleCanvasClick(event, canvas, this.context));

      this.canvasPlotWidth = canvas.clientWidth;
      this.canvasPlotHeight = canvas.clientHeight;

      this.xAxis = Math.round(this.canvasPlotWidth / this.scaleX / 2) * this.scaleX;
      this.yAxis = Math.round(this.canvasPlotHeight / this.scaleY / 2) * this.scaleY;
      //форматирование текста
      this.context.textAlign = "left";
      this.context.textBaseline = "top";
      this.#getDots();
      this.#draw()
    } else {
      console.log("Canvas doesn't work")
    }
  }

  handleCanvasClick(event: MouseEvent, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top;

    let tableX = (x - this.xAxis) / this.scaleX;
    let tableY = (this.yAxis - y) / this.scaleY;

    // Рисуем точку в месте нажатия
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#2b2d42"; // Цвет точки
    ctx.fill();

    this.dotsService.onSubmitCoordinateForm(Number(tableX.toFixed(2)), Number(tableY.toFixed(2)), this.currentR);

  }

  //вызывается при загрузке html-страницы и потом после передачи ей значений
  #draw() {
    this.context.clearRect(0, 0, this.canvasPlotWidth, this.canvasPlotHeight);
    this.#drawGrid();
    this.#drawAxes();

    this.#drawText(this.currentR);
    this.#drawPolygon(this.currentR);

    if (this.currentDotList.dots !== undefined) {
      this.currentDotList.dots.forEach((point) => {
        let color = point.status === "Hit!" ? "green" : "red";
        if (point.r === Number(this.currentR)) {
          this.#drawPoint(point.x, point.y, point.r, color);
        }
      });
    }

  }

  //рисование сетки - всегда статично
  #drawGrid() {
    this.context.beginPath();
    this.context.strokeStyle = "#ced0ce";
    //Горизонтальные линии
    for (let i = 0; i <= this.canvasPlotWidth; i = i + this.scaleX) {
      this.context.moveTo(i, 0);
      this.context.lineTo(i, this.canvasPlotHeight);
    }
    //Вертикальные линии
    for (let i = 0; i <= this.canvasPlotHeight; i = i + this.scaleY) {
      this.context.moveTo(0, i);
      this.context.lineTo(this.canvasPlotWidth, i);
    }

    this.context.stroke();
    this.context.closePath();
  }

  //рисование главных осей - всегда статично
  #drawAxes() {
    this.context.font = `${Math.round(this.scaleX / 2)}px Arial`;
    this.context.fillStyle = "black";
    this.context.beginPath();
    this.context.strokeStyle = "#000000";

    this.context.moveTo(this.xAxis, 0);
    this.context.lineTo(this.xAxis, this.canvasPlotHeight);
    this.context.fillText("y", this.xAxis - this.shiftAxisNames, 0);

    this.context.moveTo(0, this.yAxis);
    this.context.lineTo(this.canvasPlotWidth, this.yAxis);
    this.context.fillText("x", this.canvasPlotWidth - this.shiftAxisNames, this.yAxis - this.shiftAxisNames);

    this.context.stroke();
    this.context.closePath();
  }

  //рисование подписей к главным осям - зависит от R
  #drawText(r: number) {
    this.context.fillStyle = "#4f4f4f";
    this.context.font = `${Math.round((r * 10) / 2)}px Arial`;

    //ось x
    this.context.fillText(
      "-R/2",
      this.xAxis - (this.scaleX * r) / 2 + this.shiftNames,
      this.yAxis + this.shiftNames
    );
    this.context.fillText(
      "-R",
      this.xAxis - (this.scaleX * r) + this.shiftNames,
      this.yAxis + this.shiftNames
    );
    this.context.fillText(String(0), this.xAxis + this.shiftNames, this.yAxis + this.shiftNames);
    this.context.fillText(
      "R/2",
      this.xAxis + (this.scaleX * r) / 2 + this.shiftNames,
      this.yAxis + this.shiftNames
    );
    this.context.fillText(
      "R",
      this.xAxis + (this.scaleX * r) + this.shiftNames,
      this.yAxis + this.shiftNames
    );

    //ось y
    this.context.fillText(
      "R",
      this.xAxis + this.shiftNames,
      this.yAxis - (this.scaleY * r) + this.shiftNames
    );
    this.context.fillText(
      "R/2",
      this.xAxis + this.shiftNames,
      this.yAxis - (this.scaleY * r) / 2 + this.shiftNames
    );
    this.context.fillText(
      "-R/2",
      this.xAxis + this.shiftNames,
      this.yAxis + (this.scaleY * r) / 2 + this.shiftNames
    );
    this.context.fillText(
      "-R",
      this.xAxis + this.shiftNames,
      this.yAxis + (this.scaleY * r) + this.shiftNames
    );

  }

  #drawPolygon(r: number) {
    this.#drawRect(r);
    this.#drawTriangle(r);
    this.#drawArc(r);
  }

//рисование прямоугольника - зависит от R
  #drawRect(r: number) {
    this.context.beginPath();
    // this.context.rect(xAxis - scaleX * r, yAxis, scaleX * r, scaleX * (r / 2));
    this.context.rect(this.xAxis, this.yAxis, this.scaleX * r / 2, this.scaleY * r);
    this.context.closePath();
    this.context.strokeStyle = "#ffba08";
    this.context.fillStyle = "rgba(163, 155, 168, 0.5)";
    this.context.fill();
    this.context.stroke();
  }

  //рисование круга - зависит от R
  #drawArc(r: number) {
    this.context.beginPath();
    this.context.moveTo(this.xAxis, this.yAxis);
    if (r >= 0) {
      this.context.arc(this.xAxis, this.yAxis, this.scaleX * (r), -Math.PI / 2, 0, false);
    } else {
      r = Math.abs(r);
      this.context.arc(this.xAxis, this.yAxis, this.scaleX * (r), Math.PI / 2, Math.PI, false);
    }
    this.context.closePath();
    this.context.strokeStyle = "#ffba08";
    this.context.fillStyle = "rgba(163, 155, 168, 0.5)";
    this.context.fill();
    this.context.stroke();
  }

  //рисование треугольника - зависит от R
  #drawTriangle(r: number) {
    this.context.beginPath();
    this.context.moveTo(this.xAxis, this.yAxis);
    this.context.lineTo(this.xAxis, this.yAxis - this.scaleX * (r / 2));
    this.context.lineTo(this.xAxis - this.scaleX * (r), this.yAxis);
    this.context.closePath();
    this.context.strokeStyle = "#ffba08";
    this.context.fillStyle = "rgba(163, 155, 168, 0.5)";
    this.context.fill();
    this.context.stroke();
  }

//рисование точки при наличии значений x, y
  #drawPoint(x: number, y: number, r: number, color: string) {
    this.context.beginPath();
    const scaledX = this.xAxis + x * this.scaleX;
    const scaledY = this.yAxis - y * this.scaleY;
    this.context.arc(scaledX, scaledY, 4, 0, 2 * Math.PI);
    this.context.fillStyle = color; // Цвет точки, например, синий
    this.context.fill();
    this.context.closePath();
  }
}
