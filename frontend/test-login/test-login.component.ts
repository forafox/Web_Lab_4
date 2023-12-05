// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
// import {AuthService} from "../my-app/src/app/services/auth.service";
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-test-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './test-login.component.html',
//   styleUrl: './test-login.component.css'
// })
// export class TestLoginComponent {
//
//   isLoginPage: boolean = true;
//
//   togglePage() {
//     this.isLoginPage = !this.isLoginPage;
//   }
//
//   form =this.fb.nonNullable.group({
//     username:['',[Validators.required]],
//     password: ['',[Validators.required,Validators.minLength(6)]],
//     age:['',[Validators.required]],
//     email:['',[Validators.required]]
//   });
//   error='';
//
//   constructor(private fb:FormBuilder,private authService: AuthService,private router: Router) {
//
//   }
//
//   goToHomePage(): void {
//     // Выполнить переход на начальную страницу
//     this.router.navigate(['/']); // Замените '/' на ваш путь к начальной странице
//   }
//
//   onSubmit(){
//     console.log("SUBMIT: ", this.form.value);
//     const {username,password,age,email} = this.form.getRawValue()
//
//     this.authService.login(username,password,age,email).subscribe({
//       next: (res) => {
//         console.log("LOGIN DONE: ",res);
//         this.router.navigateByUrl('/dashboard');
//       },
//       error: err => {
//         this.error="Login Failed :(";
//         console.log(err)
//       }
//     });
//   }
//   createAccount(){
//     console.log("CREATE: ",this.form.value);
//     const {username,password,age,email} = this.form.getRawValue()
//
//     this.authService.register(username,password,age,email).subscribe({
//       next: (res) => {
//         console.log("REGISTER DONE: ",res);
//         this.router.navigateByUrl('/dashboard');
//       },
//       error: err => {
//         this.error="Registration Failed :(";
//         console.log(err)
//       }
//     });
//   }
// }
