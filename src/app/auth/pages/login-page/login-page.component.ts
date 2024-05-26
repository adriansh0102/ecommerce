import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )

  public myForm: FormGroup = this.fb.group({
    email:    ['salgadoadrian2001@gmail.com', [ Validators.required, Validators.email ]],
    password: ['Adrian.0102@', [ Validators.required, Validators.minLength(6) ]],
  });

  login() {

    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: async () => {
          await Swal.fire('Successfully', 'You have authenticated yourself on the platform', 'success')

          this.router.navigateByUrl('/dashboard')
        },
        error: (message) => {
          Swal.fire('Error', ' Incorrect Credentials', 'error' )
        }
      })
  }
}
