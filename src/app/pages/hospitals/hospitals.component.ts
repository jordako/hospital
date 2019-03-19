import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html'
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  from = 0;
  totalRecords = 0;
  loading = true;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getHospitals();

    this.modalUploadService.notification
      .subscribe((resp: any) => {
        const updatedHospital = this.hospitals.find(hospital => hospital._id === resp.hospital._id);
        updatedHospital.img = resp.hospital.img;
      });
  }

  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals(this.from)
      .subscribe((resp: any) => {
        this.totalRecords = resp.total;
        this.hospitals = resp.hospitals;
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
    this.getHospitals();
  }

  onSearch(term: string) {
    if (term.length <= 0) {
      this.getHospitals();
      return;
    }

    this.loading = true;
    this.hospitalService.searchHospitals(term)
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
        this.loading = false;
      });
  }

  onAdd() {
    swal({
      title: 'Crear hospital',
      text: 'Introduzca el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: false
    }).then((name: string) => {
      if (name && name.length > 0) {
        this.hospitalService.addHospital(name)
          .subscribe(() => {
            this.getHospitals();
          });
      }
    });
  }

  onSave(hospital: Hospital) {
    this.hospitalService.updateHospital(hospital)
      .subscribe();
  }

  onDelete(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((ok: boolean) => {
      if (ok) {
        this.hospitalService.deleteHospital(hospital._id)
          .subscribe(() => {
            this.from = 0;
            this.getHospitals();
          });
      }
    });
  }

  onClickImage(hospital: Hospital) {
    this.modalUploadService.showModal('hospitals', hospital._id, hospital.img);
  }

}
