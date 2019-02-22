import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/models';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<any> {
    const url = URL_SERVICES + '/user';
    return this.http.post(url, user);
  }
}
