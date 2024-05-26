import { CommonModule, NgFor, NgIf } from '@angular/common';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { NgbNavModule, NgbDropdownModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [NgbNavModule, NgbDropdownModule, NgFor, NgIf, NgbAlertModule, ReactiveFormsModule, FormsModule, CommonModule
  ],
  templateUrl: './forgot_password.component.html',
  styleUrls: ['./forgot_password.component.css'],
})
export class ForgotPasswordPageComponent {

  private readonly baseUrl: string = environment.baseUrl;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  private id_userPassword: string = ''
  public active = 1;
  private codePassword: number = 0;
  public email: string = '';
  public loading = {
    loader_1: false,
    loader_2: false,
    loader_3: false
  }

  public myForm_email: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  public myForm_code: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
  });
  public myForm_password: FormGroup = this.fb.group({
    password_1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    password_2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],

  });

  async SendEmail() {
    const { email } = this.myForm_email.value
    this.loading.loader_1 = true;
    const validEmail = await fetch(`${this.baseUrl}/api/user/buscarEmail/${email}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json())

    if (!validEmail.ok) {
      this.loading.loader_1 = false;
      Swal.fire('Error', ' Email not valid', 'error')
    }
    else {
      this.id_userPassword = validEmail.id
      const code = await fetch(`${this.baseUrl}/api/user/sendCode/${email}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }).then(response => response.json())

      if (!code.code) {
        this.loading.loader_1 = false;
        Swal.fire('Error', 'Check your internet connection', 'error')
      }
      else {
        this.codePassword = code.code
        this.loading.loader_1 = false;
        this.active = 2;
      };
    }
  }

  async VerifyCode() {

    if (this.codePassword == this.myForm_code.value.code) {
      await Swal.fire('Successfully', 'Correct code', 'success')
      this.active = 3;
    }
    else {

      Swal.fire('Error', 'Incorrect code', 'error')
    }
  }

  async RectifyPassword() {

    const password_1 = this.myForm_password.value.password_1;
    const password_2 = this.myForm_password.value.password_2;

    if (password_1 != password_2) Swal.fire('Error', 'Passwords are not the same', 'error')
    else {
      this.loading.loader_3 = true;
      const update_user = await fetch(`${this.baseUrl}/api/user/${this.id_userPassword}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password_1 })
      }).then(response => response.json())
      this.loading.loader_3 = false;

      if (update_user.error) {
        Swal.fire('Error', 'Error', 'error')
      }
      else {
        await Swal.fire('Successfully', 'Your password has been changed successfully', 'success')
        this.router.navigateByUrl('/auth/login');
      }
    }
  }

  cambiar() {
    this.active += 1
    if (this.active == 4) this.active = 1
  }



}
