import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services';
import { User } from '../models';

declare function init_pluggins(): void;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  auth2: any;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
    init_pluggins();
    this.googleInit();
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(false)
    });

    const email = localStorage.getItem('email') || '';
    this.form.patchValue({
      email: email,
      remember: email.length > 0
    });
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '806301266467-n6p7ur2qkqqg6qajp5cad5l2qv1mr44i.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(<HTMLButtonElement>(
        document.getElementById('btnGoogle')
      ));
    });
  }

  attachSignin(el: HTMLButtonElement) {
    this.auth2.attachClickHandler(el, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      // console.log(profile);

      const token = googleUser.getAuthResponse().id_token;
      this.userService
        .loginGoogle(token)
        .subscribe(() => (window.location.href = '#/dashboard'));
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }

    const user = new User(
      null,
      this.form.value.email,
      this.form.value.password
    );

    this.userService
      .login(user, this.form.value.remember)
      .subscribe(() => this.router.navigate(['/dashboard']));
  }
}
