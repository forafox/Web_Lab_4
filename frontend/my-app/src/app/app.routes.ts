import { Routes} from '@angular/router';
import {AuthService} from "./services/auth.service";
import {inject} from "@angular/core";
export const routes: Routes =[
  {
    path:'auth',
    loadComponent:()=>import('../../src/app/pages/login/login.component').then((mod)=>mod.LoginComponent),
    canActivate: [()=> inject(AuthService).shouldLogIn()]
  },
  {
    path:'dashboard',
    loadComponent:()=>import('./pages/dashboard/dashboard.component').then((mod)=>mod.DashboardComponent),
    canActivate: [()=> inject(AuthService).isLoggedIn()]
  },
  {
    path:'',
    loadComponent:()=>import('./pages/main/main.component').then((mod)=>mod.MainComponent),
  },
  {
    path:'contact',
    loadComponent:()=>import('./pages/contact/contact.component').then((mod)=>mod.ContactComponent),
    canActivate: [()=> inject(AuthService).isLoggedIn()]
  },
  {
    path:'register',
    loadComponent:()=>import('./pages/registration/registration.component').then((mod)=>mod.RegistrationComponent),
  },
  {
    path:'dots',
    loadComponent:()=>import('./pages/dots-manager/dots-manager.component').then((mod)=>mod.DotsManagerComponent),
    canActivate: [()=> inject(AuthService).isLoggedIn()]
  },

];
