import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

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
  createAccount(){
    console.log("CREATE: ",this.form.value);
    const {username,password,age,email} = this.form.getRawValue()

    this.authService.register(username,password,age,email).subscribe({
      next: (res) => {
        console.log("REGISTER DONE: ",res);
        this.router.navigateByUrl('/dashboard');
      },
      error: err => {
        this.error="Registration Failed :(";
        console.log(err)
      }
    });
  }
}
