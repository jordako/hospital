import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/models';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    const url = URL_SERVICES + '/user';
    return this.http.post(url, user).pipe(
      map((resp: any) => {
        swal('Usuario creado', user.email, 'success');
        return <User>resp.user;
      })
    );
  }

  login(user: User, remember: boolean = false) {
    const url = URL_SERVICES + '/login';
    return this.http.post(url, user);
  }
}
