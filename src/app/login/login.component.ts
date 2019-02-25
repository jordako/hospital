import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services';
import { User } from '../models';

declare function init_pluggins(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit() {
    init_pluggins();

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      remember: new FormControl(false)
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
      .subscribe(resp => console.log(resp));

    // this.router.navigate(['/dashboard']);
  }
}
