import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    public http: HttpClient
  ) { }

  searchAll(term: string) {
    const url = URL_SERVICES + '/search/all/' + term;
    return this.http.get(url);
  }
}
