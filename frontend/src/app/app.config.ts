import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {
  HTTP_INTERCEPTORS, HttpClientModule,
} from "@angular/common/http";
import {
  NoopInterceptor
} from "./services/http/http-interceptor-service/http-interceptor-service.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {DotsManagerComponent} from "./pages/dots-manager/dots-manager.component";

export const appConfig: ApplicationConfig = {
  providers: [
    DotsManagerComponent,
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true},
  ]
};
