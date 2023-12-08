import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {LoginComponent} from "../../login/login.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  ngOnInit() {
    // Подписываемся на изменения
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      console.log("Поменялось на ",isLoggedIn)
    });
  }

  constructor(private authService: AuthService,private router: Router,private loginComponent: LoginComponent ){
    // if(authService.isLoggedInWithoutRouts()){
    //   this.isLoggedIn = true;
    // }
  }

  togglePage() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  logout(){
    this.authService.signOut();
    this.router.navigateByUrl('/')
  }

  // togglePageLoginComponent(){
  //   this.loginComponent.togglePage();
  // }

}
