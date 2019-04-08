import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public userService: UserService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this.userService.token;
    const payload = JSON.parse( atob(token.split('.')[1]) );

    const expired = this.expired(payload.exp);

    if (expired) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verifyRenews(payload.exp);
  }

  verifyRenews(expirationDate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const expirationToken = new Date(expirationDate * 1000);
      const now = new Date();

      now.setTime( now.getTime() + (4 * 60 * 60 * 1000));

      if (expirationToken.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this.userService.renewToken().subscribe(
          () => resolve(true),
          () => {
            this.router.navigate(['/login']);
            reject(false);
          }
        );
      }
    });
  }

  expired(expirationDate: number) {
    const now = new Date().getTime() / 1000;

    return expirationDate < now;
  }
}
