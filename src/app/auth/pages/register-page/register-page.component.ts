import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  ngOnInit(): void {
    this.selectValue = 'femenino'
  }

  isNumber():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if(isNaN(control.value)){
        return { 'notNumber': true };
      }
      return null;
    }
  }

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService);
  private router      = inject( Router )

  public selectValue: string ='femenino';

  public myForm: FormGroup = this.fb.group({
    nombre:     [ 'aaaaaa', [Validators.required, Validators.minLength(4)]],
    edad:       [ 0, [Validators.required, Validators.min(18), Validators.max(100), this.isNumber()]],
    email:      ['', [ Validators.required, Validators.email ]],
    password:   ['', [ Validators.required, Validators.minLength(6) ,  Validators.maxLength(12)]],

  });

  async register(){

    let {
      nombre ,
      edad,
      password ,
      email
    } = this.myForm.value;

    await this.authService.register( {nombre , edad, password , email, sexo: this.selectValue} )
  }
}
