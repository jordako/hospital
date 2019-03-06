import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File, type: string, id: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);

    const url = URL_SERVICES + '/upload/' + type + '/' + id;
    return this.http.put(url, formData).pipe(
      map((resp: any) => resp)
    );
  }
}
