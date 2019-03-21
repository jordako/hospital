import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from 'src/app/models';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;

  constructor(private http: HttpClient, private router: Router, private uploadFileService: UploadFileService) {
    this.loadStorage();
  }

  getUsers(from: number = 0, limit: number = 5): Observable<{total: number, users: User[]}> {
    const url = URL_SERVICES + '/user?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return {
          total: <number>resp.total,
          users: <User[]>resp.users
        };
      })
    );
  }

  addUser(user: User): Observable<User> {
    const url = URL_SERVICES + '/user';
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        swal('Usuario creado', user.name, 'success');
        return <User>resp.user;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const url = URL_SERVICES + '/user/' + user._id + '?token=' + this.token;
    return this.http.put(url, user).pipe(
      map((resp: any) => {
        const updatedUser = <User>resp.user;

        if (user._id === this.user._id) {
          this.saveStorage(updatedUser._id, this.token, updatedUser);
        }

        swal('Usuario actualizado', updatedUser.name, 'success');
        return updatedUser;
      })
    );
  }

  deleteUser(id: string): Observable<User> {
    const url = URL_SERVICES + '/user/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        const deletedUser = <User>resp.user;
        swal('Usuario borrado', deletedUser.name, 'success');
        return deletedUser;
      })
    );
  }

  updateImage(file: File): Observable<User> {
    return this.uploadFileService.uploadFile(file, 'users', this.user._id).pipe(
      map((resp: any) => {
        const updatedUser = <User>resp.user;
        this.user.img = updatedUser.img;
        this.saveStorage(updatedUser._id, this.token, updatedUser);

        swal('Imagen de usuario actualizada', updatedUser.name, 'success');
        return updatedUser;
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

  searchUsers(term: string): Observable<User[]> {
    // TODO paginar los resultados de la búsqueda
    const url = URL_SERVICES + '/search/collection/users/' + term;

    return this.http.get(url).pipe(
      map((resp: any) => <User[]>resp.users)
    );
  }
}
