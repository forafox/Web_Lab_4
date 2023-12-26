import {Component, Injectable} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../components/header/header.component";
import {FooterComponent} from "../components/footer/footer.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class ContactComponent {


  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telephoneNumber: ['', [Validators.required]]
  });
  error = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient
  ) {
  }


  nameControl = () => this.form.controls.name;
  emailControl = () => this.form.controls.email;
  telephoneControl = () => this.form.controls.telephoneNumber;


  markAsTouched() {
    this.nameControl().markAsTouched();
    this.telephoneControl().markAsTouched();
    this.emailControl().markAsTouched();
  }

  getNameErrorMessage() {
    const requiredError = this.nameControl().hasError('required');
    if (requiredError) {
      return 'Name is required';
    }
    return ''; // В случае отсутствия ошибок
  }

  getEmailErrorMessage() {
    const emailError = this.emailControl().hasError('email');
    const requiredError = this.emailControl().hasError('required');

    if (requiredError) {
      return 'Email is required';
    } else if (emailError) {
      return 'Email is invalid';
    }
    return ''; // В случае отсутствия ошибок
  }

  getTelephoneNumberError() {
    const requiredError = this.telephoneControl().hasError('required');
    const maxLengthError = this.telephoneControl().hasError("maxlength");
    const minLengthError = this.telephoneControl().hasError("minlength");

    if (requiredError) {
      return 'Telephone number is required';
    } else if (minLengthError) {
      return 'Telephone number must be at least 10 characters';
    } else if (maxLengthError) {
      return 'Telephone number must be no more than 11 characters'
    }

    return ''; // В случае отсутствия ошибок
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAsTouched();
      return;
    } else {
      const {name, email, telephoneNumber} = this.form.getRawValue()

      this.sendContact(name, email, telephoneNumber).subscribe({
        next: (res) => {
        },
        error: err => {
          this.error = "Send Message Failed :(";
          console.log(err)
        }
      });
      this.router.navigateByUrl('/');
    }
  }

  sendContact(name: string, email: string, telephoneNumber: string) {
    return this.http.post('http://localhost:8080/api/email/contact', {
      name,
      email,
      telephoneNumber,
    },);
  }


}
