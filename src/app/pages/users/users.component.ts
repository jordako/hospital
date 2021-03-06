import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];
  from = 0;
  totalRecords = 0;
  loading = true;
  uploadSubscription: Subscription;

  constructor(
    public userService: UserService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.updateImage();
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  updateImage() {
    this.uploadSubscription = this.modalUploadService.notification
      .subscribe((resp: any) => {
        const updatedUser = this.users.find(user => user._id === resp.user._id);
        updatedUser.img = resp.user.img;

        if (updatedUser._id === this.userService.user._id) {
          this.userService.user.img = updatedUser.img;
          this.userService.saveStorage(updatedUser._id, this.userService.token, updatedUser, this.userService.menu);
        }
      });
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from)
      .subscribe((resp: any) => {
        this.totalRecords = resp.total;
        this.users = resp.users;
        this.loading = false;
      });
  }

  onPaginate(value: number) {
    const from = this.from + value;

    if (from >= this.totalRecords) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from = from;
    this.getUsers();
  }

  onSearch(term: string) {
    if (term.length <= 0) {
      this.getUsers();
      return;
    }

    this.loading = true;
    this.userService.searchUsers(term)
      .subscribe((users: User[]) => {
        this.users = users;
        this.loading = false;
      });
  }

  onSave(user: User) {
    this.userService.updateUser(user)
      .subscribe();
  }

  onDelete(user: User) {
    if (user._id === this.userService.user._id) {
      swal('No puede borar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + user.name,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true
    }).then((ok: boolean) => {
      if (ok) {
        this.userService.deleteUser(user._id)
          .subscribe(() => {
            this.from = 0;
            this.getUsers();
          });
      }
    });
  }

  onClickImage(user: User) {
    this.modalUploadService.showModal('users', user._id, user.img);
  }
}
