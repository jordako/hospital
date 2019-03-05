import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(public userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl({value: null, disabled: this.user.google}, [Validators.required, Validators.email]),
    });

    this.form.patchValue(this.user);
  }

  onSaveBasicData() {
    if (this.form.invalid) {
      return;
    }

    this.user.name = this.form.value.name;
    if (!this.user.google) {
      this.user.email = this.form.value.email;
    }

    this.userService.updateUser(this.user).subscribe();
  }

}
