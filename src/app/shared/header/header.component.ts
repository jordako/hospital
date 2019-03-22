import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { User } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  onSearch(term: string) {
    this.router.navigate(['/search', term]);
  }
}
