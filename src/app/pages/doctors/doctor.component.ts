import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService, HospitalService } from 'src/app/services';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit, OnDestroy {

  doctor: Doctor = new Doctor('', '', null, new Hospital(''), '');
  form: FormGroup;
  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  uploadSubscription: Subscription;

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService,
    public router: Router,
    public route: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'new') {
        this.setDoctor(id);
      }
    });
  }

  ngOnInit() {
    this.createForm();
    this.setHospitals();
    this.updateImage();
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

  updateImage() {
    this.uploadSubscription = this.modalUploadService.notification
      .subscribe((resp: any) => this.doctor.img = resp.doctor.img);
  }

  setDoctor(id: string) {
    this.doctorService.getDoctor(id)
      .subscribe(doctor => {
        this.doctor = doctor;
        this.hospital = doctor.hospital;

        this.form.patchValue({
          name: this.doctor.name,
          hospitalId: this.doctor.hospital._id
        });
      });
  }

  setHospitals() {
    this.hospitalService.getHospitals(0, 0)
      .subscribe((resp: any) => this.hospitals = resp.hospitals);
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      hospitalId: new FormControl('', Validators.required)
    });
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    this.doctor.name = this.form.value.name;
    this.doctor.hospital._id = this.form.value.hospitalId;
    this.doctorService.saveDoctor(this.doctor)
      .subscribe(doctor => {
        this.doctor._id = doctor._id;
        this.router.navigate(['/doctor', doctor._id]);
      });
  }

  onChangeHospital(id: string) {
    this.hospitalService.getHospital(id)
      .subscribe(hospital => this.hospital = hospital);
  }

  onClickImage(doctor: Doctor) {
    this.modalUploadService.showModal('doctors', doctor._id, doctor.img);
  }

}
