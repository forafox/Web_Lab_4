import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {HeaderComponent} from "../components/header/header.component";
import {FooterComponent} from "../components/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userID= this.authService.getCurrentUserId();
  constructor(private authService: AuthService,private router: Router) {
  }

  logout(){
    this.authService.signOut();
    this.router.navigateByUrl("/")
  }
}
