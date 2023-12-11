import {Component, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-data-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-service.component.html',
  styleUrl: './data-service.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class DataServiceComponent {
  private dataSubject = new BehaviorSubject<number>(0);

  updateData(newValue: number) {
    this.dataSubject.next(newValue);
  }

  getData(): Observable<number> {
    return this.dataSubject.asObservable();
  }
}
