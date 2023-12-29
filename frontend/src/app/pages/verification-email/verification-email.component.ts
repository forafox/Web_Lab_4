import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../components/header/header.component";
import {FooterComponent} from "../components/footer/footer.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verification-email',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './verification-email.component.html',
  styleUrl: './verification-email.component.css'
})
export class VerificationEmailComponent implements OnInit {

  secondsRemaining = 5;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const countdownInterval = setInterval(() => {
      this.secondsRemaining--;

      if (this.secondsRemaining === 0) {
        clearInterval(countdownInterval);
        this.navigateToDashboard();
      }
    }, 1000);
  }

  private navigateToDashboard(): void {
    // Navigate to the '/dashboard' route
    this.router.navigateByUrl('/');
  }

}
