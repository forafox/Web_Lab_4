import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
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

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const pass = passwordControl.value;
      const confirmPass = confirmPasswordControl.value;

      return pass === confirmPass ? null : {notSame: true};
    }

    return null; // Возвращаем null, если контролы не существуют
  };

  ageValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {

    const value = group.value;
    // Попробуем преобразовать значение в число
    const numericValue = parseFloat(value);

    // Проверка, является ли значение числом
    if (isNaN(numericValue)) {
      return {notANumber: true};
    }

    // Проверка, является ли значение целым положительным числом
    const isInteger = Number.isInteger(numericValue);
    const isPositive = value > 0;
    const isValid = value >= 0 && value <= 100;

    if (!isInteger || !isPositive || !isValid) {
      return {invalidAge: true};
    }

    return null; // Валидация прошла успешно
  };


  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    age: ['', [Validators.required, this.ageValidator]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(30)]],
    confirmPassword: ['', [Validators.required]]
  }, {validators: this.checkPasswords});

  usernameControl = () => this.form.controls.username;
  passwordControl = () => this.form.controls.password;
  ageControl = () => this.form.controls.age;
  emailControl = () => this.form.controls.email;
  confirmPasswordControl = () => this.form.controls.confirmPassword;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
  ) {

  }

  createAccount() {

    this.markAsTouched();

    if (this.form.invalid) {
      // console.log("invalid form")
      return;
    } else {
      console.log("CREATE: ", this.form.value);
      const {username, password, age, email} = this.form.getRawValue()

      this.authService.register(username, password, age, email).subscribe({
        next: (res) => {
          console.log("REGISTER DONE: ", res);
          this.router.navigateByUrl('/dashboard');
        },
        error: err => {
          // this.error = "Registration Failed :(";
          console.log(err)
        }
      });
    }
  }

  markAsTouched() {
    this.passwordControl().markAsTouched();
    this.usernameControl().markAsTouched();
    this.emailControl().markAsTouched();
    this.confirmPasswordControl().markAsTouched();
    this.ageControl().markAsTouched();
  }

  // В вашем компоненте
  getUsernameErrorMessage() {
    const minLengthError = this.usernameControl().hasError('minlength');
    const requiredError = this.usernameControl().hasError('required');
    const maxLengthError = this.usernameControl().hasError("maxlength");

    if (requiredError) {
      return 'Username is required';
    } else if (minLengthError) {
      return 'Username must be at least 6 characters';
    } else if (maxLengthError) {
      return 'Username must be no more than 20 characters'
    }

    return ''; // В случае отсутствия ошибок
  }

  getEmailErrorMessage() {
    const emailError = this.emailControl().hasError('email');
    const requiredError = this.emailControl().hasError('required');
    const maxLengthError = this.emailControl().hasError("maxlength");

    if (requiredError) {
      return 'Email is required';
    } else if (emailError) {
      return 'Email is invalid';
    } else if (maxLengthError) {
      return 'Email must be no more than 30 characters'
    }

    return ''; // В случае отсутствия ошибок
  }

  getPasswordErrorMessage() {
    const minLengthError = this.passwordControl().hasError('minlength');
    const requiredError = this.passwordControl().hasError('required');
    const maxLengthError = this.passwordControl().hasError("maxlength");

    if (requiredError) {
      return 'Password is required';
    } else if (minLengthError) {
      return 'Password must be at least 6 characters';
    } else if (maxLengthError) {
      return 'Password must be no more than 20 characters'
    }

    return ''; // В случае отсутствия ошибок
  }

  getConfirmPasswordErrorMessage() {
    const notSamePassword = this.form.hasError('notSame');
    const requiredError = this.passwordControl().hasError('required');

    if (requiredError) {
      return 'Confirm password is required';
    } else if (notSamePassword) {
      return 'Confirm password does not match';
    }

    return ''; // В случае отсутствия ошибок
  }

  getAgeErrorMessage() {

    const notANumber = this.ageControl().hasError('notANumber');
    const requiredError = this.ageControl().hasError('required');
    const invalidAge = this.ageControl().hasError('invalidAge');

    if (requiredError) {
      return 'Age is required';
    } else if (notANumber) {
      return 'Number is required';
    } else if (invalidAge) {
      return "Incorrect number";
    }

    return ''; // В случае отсутствия ошибок
  }


}
