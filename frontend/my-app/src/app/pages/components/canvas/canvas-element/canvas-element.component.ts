import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../../header/header.component";
import {FooterComponent} from "../../footer/footer.component";

@Component({
  selector: 'app-canvas-element',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './canvas-element.component.html',
  styleUrl: './canvas-element.component.css'
})
export class CanvasElementComponent implements OnInit{
  @ViewChild('canvas',{static:true})myCanvas!:ElementRef;
  private scaleX: number = 30;
  private scaleY: number = 30;
  private defaultR: number=2;
  canvasPlotWidth: number =0 ;
  canvasPlotHeight: number=0;
  private xAxis: number = 0;
  private yAxis: number = 0;

  currentR: number=0;

  //коэффициент смещения текста от осей
   shiftNames:number = 5;
   shiftAxisNames:number = 20;

  ngOnInit(): void {
    const canvas: HTMLCanvasElement =this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if(context) {
      this.#drawRectangle(context);
       this.canvasPlotWidth = canvas.clientWidth;
       this.canvasPlotHeight = canvas.clientHeight;

      this.xAxis = Math.round(this.canvasPlotWidth / this.scaleX / 2) * this.scaleX;
      this.yAxis = Math.round(this.canvasPlotHeight / this.scaleY / 2) * this.scaleY;
      //форматирование текста
      context.textAlign = "left";
      context.textBaseline = "top";
      this.#draw(context);
    }else{
      console.log("Canvas doesn't work")
    }
  }
  #drawRectangle(context: CanvasRenderingContext2D){
    context.fillRect(20,20,100,100);
  }
  //вызывается при загрузке html-страницы и потом после передачи ей значений
  #draw(context: CanvasRenderingContext2D){
    context.clearRect(0,0,this.canvasPlotWidth,this.canvasPlotHeight);
    this.#drawGrid(context);
    this.#drawAxes(context);

    if(this.currentR == 0){
      this.currentR =  this.defaultR
      this.#drawText(context,this.defaultR);
      this.#drawPolygon(context,this.defaultR);
    }else{
      this.#drawText(context,this.currentR);
      this.#drawPolygon(context,this.currentR);
    }

  }
  //рисование сетки - всегда статично
  #drawGrid(ctx: CanvasRenderingContext2D){
    ctx.beginPath();
    ctx.strokeStyle = "#ced0ce";
    //Горизонтальные линии
    for (let i = 0; i <= this.canvasPlotWidth; i = i + this.scaleX) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.canvasPlotHeight);
    }
    //Вертикальные линии
    for (let i = 0; i <= this.canvasPlotHeight; i = i + this.scaleY) {
      ctx.moveTo(0, i);
      ctx.lineTo(this.canvasPlotWidth, i);
    }

    ctx.stroke();
    ctx.closePath();
  }
  //рисование главных осей - всегда статично
  #drawAxes(ctx: CanvasRenderingContext2D){
    ctx.font = `${Math.round(this.scaleX / 2)}px Arial`;
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.strokeStyle = "#000000";

    ctx.moveTo(this.xAxis, 0);
    ctx.lineTo(this.xAxis, this.canvasPlotHeight);
    ctx.fillText("y", this.xAxis - this.shiftAxisNames, 0);

    ctx.moveTo(0, this.yAxis);
    ctx.lineTo(this.canvasPlotWidth, this.yAxis);
    ctx.fillText("x", this.canvasPlotWidth - this.shiftAxisNames, this.yAxis - this.shiftAxisNames);

    ctx.stroke();
    ctx.closePath();
  }

  //рисование подписей к главным осям - зависит от R
  #drawText(ctx: CanvasRenderingContext2D,r:number){
    ctx.fillStyle = "#4f4f4f";
    ctx.font = `${Math.round((r * 10) / 2)}px Arial`;

    //ось x
    ctx.fillText(
      "-R/2",
      this.xAxis - (this.scaleX * r) / 2 + this.shiftNames,
      this.yAxis + this.shiftNames
    );
    ctx.fillText(
      "-R",
      this.xAxis - (this.scaleX * r) + this.shiftNames,
      this.yAxis + this.shiftNames
    );
    ctx.fillText(String(0), this.xAxis + this.shiftNames, this.yAxis + this.shiftNames);
    ctx.fillText(
      "R/2",
      this.xAxis + (this.scaleX * r) / 2 + this.shiftNames,
      this.yAxis + this.shiftNames
    );
    ctx.fillText(
      "R",
      this.xAxis + (this.scaleX * r)  + this.shiftNames,
      this.yAxis + this.shiftNames
    );

    //ось y
    ctx.fillText(
      "R",
      this.xAxis + this.shiftNames,
      this.yAxis - (this.scaleY * r) + this.shiftNames
    );
    ctx.fillText(
      "R/2",
      this.xAxis + this.shiftNames,
      this.yAxis - (this.scaleY * r) / 2 + this.shiftNames
    );
    ctx.fillText(
      "-R/2",
      this.xAxis + this.shiftNames,
      this.yAxis + (this.scaleY * r) / 2 + this.shiftNames
    );
    ctx.fillText(
      "-R",
      this.xAxis + this.shiftNames,
      this.yAxis + (this.scaleY * r) + this.shiftNames
    );

  }
  #drawPolygon(ctx: CanvasRenderingContext2D,r:number){
    this.#drawRect(ctx,r);
    this.#drawTriangle(ctx,r);
    this.#drawArc(ctx,r);
  }
//рисование прямоугольника - зависит от R
  #drawRect(ctx: CanvasRenderingContext2D,r:number){
    ctx.beginPath();
    // ctx.rect(xAxis - scaleX * r, yAxis, scaleX * r, scaleX * (r / 2));
    ctx.rect(this.xAxis, this.yAxis, this.scaleX * r / 2, this.scaleY * r);
    ctx.closePath();
    ctx.strokeStyle = "#ffba08";
    ctx.fillStyle = "rgba(163, 155, 168, 0.5)";
    ctx.fill();
    ctx.stroke();
  }

  //рисование круга - зависит от R
  #drawArc(ctx: CanvasRenderingContext2D,r:number){
    ctx.beginPath();
    ctx.moveTo( this.xAxis,  this.yAxis);
    ctx.arc( this.xAxis,  this.yAxis,  this.scaleX * (r), -Math.PI / 2, 0, false);
    ctx.closePath();
    ctx.strokeStyle = "#ffba08";
    ctx.fillStyle = "rgba(163, 155, 168, 0.5)";
    ctx.fill();
    ctx.stroke();
  }
  //рисование треугольника - зависит от R
  #drawTriangle(ctx: CanvasRenderingContext2D,r:number){
    ctx.beginPath();
    ctx.moveTo(this.xAxis, this.yAxis);
    ctx.lineTo(this.xAxis, this.yAxis - this.scaleX * (r / 2));
    ctx.lineTo(this.xAxis - this.scaleX * (r), this.yAxis);
    ctx.closePath();
    ctx.strokeStyle = "#ffba08";
    ctx.fillStyle = "rgba(163, 155, 168, 0.5)";
    ctx.fill();
    ctx.stroke();
  }
//рисование точки при наличии значений x, y
  #drawPoint(ctx: CanvasRenderingContext2D,r:number,x:number,y:number,color:string){
    ctx.beginPath();
    const scaledX = this.xAxis + x * this.scaleX;
    const scaledY = this.yAxis - y * this.scaleY;
    ctx.arc(scaledX, scaledY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = color; // Цвет точки, например, синий
    ctx.fill();
    ctx.closePath();
  }

}
