import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  user: User;

  constructor(
    public sidebarService: SidebarService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;
  }
}
