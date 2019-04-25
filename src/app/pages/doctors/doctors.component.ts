import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html'
})
export class DoctorsComponent implements OnInit, OnDestroy {

  doctors: Doctor[] = [];
  from = 0;
  totalRecords = 0;
  loading = true;
  uploadSubscription: Subscription;

  constructor(
    public doctorService: DoctorService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getDoctors();

    this.uploadSubscription = this.modalUploadService.notification
      .subscribe((resp: any) => {
        const updatedDoctor = this.doctors.find(doctor => doctor._id === resp.doctor._id);
        updatedDoctor.img = resp.doctor.img;
      });
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  getDoctors() {
    this.loading = true;
    this.doctorService.getDoctors(this.from)
      .subscribe((resp: any) => {
        this.totalRecords = resp.total;
        this.doctors = resp.doctors;
        this.loading = false;
      });
  }

  onPaginate(value: number) {
    const from = this.from + value;

    if (from >= this.totalRecords) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from = from;
    this.getDoctors();
  }

  onSearch(term: string) {
    if (term.length <= 0) {
      this.getDoctors();
      return;
    }

    this.loading = true;
    this.doctorService.searchDoctors(term)
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
        this.loading = false;
      });
  }

  onDelete(doctor: Doctor) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + doctor.name,
      icon: 'warning',
      buttons: [true, true],
      dangerMode: true
    }).then((ok: boolean) => {
      if (ok) {
        this.doctorService.deleteDoctor(doctor._id)
          .subscribe(() => {
            this.from = 0;
            this.getDoctors();
          });
      }
    });
  }

  onClickImage(doctor: Doctor) {
    this.modalUploadService.showModal('doctors', doctor._id, doctor.img);
  }

}
