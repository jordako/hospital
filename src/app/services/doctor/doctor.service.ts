import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Doctor } from 'src/app/models/doctor.model';
import { URL_SERVICES } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(public http: HttpClient, private userService: UserService) { }

  getDoctors(from: number = 0, limit: number = 5): Observable<{total: number, doctors: Doctor[]}> {
    const url = URL_SERVICES + '/doctor?from=' + from + '&limit=' + limit;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return {
          total: <number>resp.total,
          doctors: <Doctor[]>resp.doctors
        };
      })
    );
  }

  getDoctor(id: string): Observable<Doctor> {
    const url = URL_SERVICES + '/doctor/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => <Doctor>resp.doctor)
    );
  }

  deleteDoctor(id: string): Observable<Doctor> {
    const url = URL_SERVICES + '/doctor/' + id + '?token=' + this.userService.token;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        const deletedDoctor = <Doctor>resp.doctor;
        swal('Médico borrado', deletedDoctor.name, 'success');
        return deletedDoctor;
      })
    );
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    const url = URL_SERVICES + '/doctor?token=' + this.userService.token;    
    return this.http.post(url, {
      name: doctor.name,
      hospitalId: doctor.hospital._id
    }).pipe(
      map((resp: any) => {
        const createdDoctor = <Doctor>resp.doctor;   
        swal('Médico creado', createdDoctor.name, 'success');
        return createdDoctor;
      })
    );
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    const url = URL_SERVICES + '/doctor/' + doctor._id + '?token=' + this.userService.token;
    return this.http.put(url, {
      name: doctor.name,
      hospitalId: doctor.hospital._id
    }).pipe(
      map((resp: any) => {
        const updatedDoctor = <Doctor>resp.doctor;        
        swal('Médico actualizado', updatedDoctor.name, 'success');
        return updatedDoctor;
      })
    );
  }

  saveDoctor(doctor: Doctor): Observable<Doctor> {
    if (doctor._id) {
      return this.updateDoctor(doctor);
    } else {
      return this.addDoctor(doctor);
    }
  }

  // TODO pasar este método al servicio de búsqueda
  searchDoctors(term: string): Observable<Doctor[]> {
    const url = URL_SERVICES + '/search/collection/doctors/' + term;

    return this.http.get(url).pipe(
      map((resp: any) => <Doctor[]>resp.doctors)
    );
  }
}
