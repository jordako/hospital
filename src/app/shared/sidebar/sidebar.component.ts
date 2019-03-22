import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  user: User;
  menu: any[] = [];

  constructor(
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    this.menu = this.userService.menu;
  }
}
