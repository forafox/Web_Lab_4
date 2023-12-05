import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private authService: AuthService,private router: Router){
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

}
