import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  user: User;
  uploadImage: File;
  imageTemp: string;

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

  onChangeFile(file: File) {
    if (!file) {
      this.uploadImage = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.uploadImage = null;
      return;
    }

    this.uploadImage = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.imageTemp = <string>reader.result;
  }

  updateImage() {
    this.userService.updateImage(this.uploadImage).subscribe(resp => console.log(resp));
  }

}
