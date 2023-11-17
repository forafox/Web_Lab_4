// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  // sads
  declarations: [
    // Здесь вы добавляете другие компоненты, директивы и т.д.
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // Здесь вы добавляете модули, необходимые для вашего приложения
  ],
  providers: [
    HttpClient
    // Здесь вы добавляете сервисы, если это необходимо
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
