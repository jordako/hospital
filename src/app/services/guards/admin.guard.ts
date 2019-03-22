import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
