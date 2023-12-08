import {Component, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent {

  // isLoginPage: boolean = false;
  //
  // togglePage() {
  //   console.log("Changed loginPage",this.isLoginPage)
  //   this.isLoginPage = !this.isLoginPage;
  // }

  form =this.fb.nonNullable.group({
    username:['',[Validators.required]],
    password: ['',[Validators.required,Validators.minLength(6)]],
    age:['',[Validators.required]],
    email:['',[Validators.required]]
  });
  error='';

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router,
              ) {

  }

  goToDashboardPage(): void {
    // Выполнить переход на начальную страницу
    this.router.navigate(['/dashboard']); // Замените '/' на ваш путь к начальной странице
  }

  onSubmit(){
    console.log("SUBMIT: ", this.form.value);
    const {username,password,age,email} = this.form.getRawValue()

    this.authService.login(username,password,age,email).subscribe({
      next: (res) => {
        console.log("LOGIN DONE: ",res);

        this.goToDashboardPage();
      },
      error: err => {
        this.error="Login Failed :(";
        console.log(err)
      }
    });
  }
}
