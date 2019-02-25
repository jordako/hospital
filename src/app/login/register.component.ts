import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../services';
import { User } from '../models';

declare function init_pluggins(): void;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    init_pluggins();

    this.form = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        terms: new FormControl(false)
      },
      { validators: this.equals('password', 'password2') }
    );
  }

  equals(control1: string, control2: string): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const value1 = group.controls[control1].value;
      const value2 = group.controls[control2].value;

      if (value1 === value2) {
        return null;
      }

      return { equals: true };
    };
  }

  onRegister() {
    if (this.form.invalid) {
      return;
    }

    if (!this.form.value.terms) {
      swal('Importante', 'Debe aceptar las condiciones de uso', 'warning');
      return;
    }

    const user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.userService
      .addUser(user)
      .subscribe(() => this.router.navigate(['/login']));
  }
}
