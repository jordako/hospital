import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.user;
  }
}
