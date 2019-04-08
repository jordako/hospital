import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getHospitals(from: number = 0, limit: number = 5): Observable<{total: number, hospitals: Hospital[]}> {
    const url = URL_SERVICES + '/hospital?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return {
          total: <number>resp.total,
          hospitals: <Hospital[]>resp.hospitals
        };
      })
    );
  }

  getHospital(id: string): Observable<Hospital> {
    const url = URL_SERVICES + '/hospital/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => <Hospital>resp.hospital)
    );
  }

  deleteHospital(id: string): Observable<Hospital> {
    const url = URL_SERVICES + '/hospital/' + id + '?token=' + this.userService.token;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        const deletedHospital = <Hospital>resp.hospital;
        swal('Hospital borrado', deletedHospital.name, 'success');
        return deletedHospital;
      })
    );
  }

  addHospital(name: string): Observable<Hospital> {
    const url = URL_SERVICES + '/hospital?token=' + this.userService.token;
    return this.http.post(url, { name }).pipe(
      map((resp: any) => {
        const createdHospital = <Hospital>resp.hospital;   
        swal('Hospital creado', createdHospital.name, 'success');
        return createdHospital;
      })
    );
  }

  updateHospital(hospital: Hospital): Observable<Hospital> {
    const url = URL_SERVICES + '/hospital/' + hospital._id + '?token=' + this.userService.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        const updatedHospital = <Hospital>resp.hospital;        
        swal('Hospital actualizado', updatedHospital.name, 'success');
        return updatedHospital;
      })
    );
  }

  // TODO pasar este método al servicio de búsqueda
  searchHospitals(term: string): Observable<Hospital[]> {
    const url = URL_SERVICES + '/search/collection/hospitals/' + term;

    return this.http.get(url).pipe(
      map((resp: any) => <Hospital[]>resp.hospitals)
    );
  }

}
