import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from 'src/app/models';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.loadStorage();
  }

  addUser(user: User): Observable<User> {
    const url = URL_SERVICES + '/user';
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        swal('Usuario creado', user.email, 'success');
        return <User>resp.user;
      })
    );
  }

  login(user: User, remember: boolean = false): Observable<void> {
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICES + '/login';
    return this.http
      .post(url, user)
      .pipe(
        map((resp: any) => this.saveStorage(resp.id, resp.token, resp.user))
      );
  }

  loginGoogle(token: string): Observable<void> {
    const url = URL_SERVICES + '/login/google';
    return this.http
      .post(url, { token })
      .pipe(
        map((resp: any) => this.saveStorage(resp.id, resp.token, resp.user))
      );
  }

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  saveStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loadStorage() {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';

    this.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  }

  isLogged(): boolean {
    return this.token ? true : false;
  }
}
