import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorService, HospitalService } from 'src/app/services';
import { Hospital } from 'src/app/models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html'
})
export class DoctorComponent implements OnInit {

  doctor: Doctor = new Doctor();
  form: FormGroup;
  hospitals: Hospital[] = [];

  constructor(
    public doctorService: DoctorService,
    public hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.createForm();
    this.setHospitals();
  }

  setHospitals() {
    this.hospitalService.getHospitals()
      .subscribe((resp: any) => this.hospitals = resp.hospitals);
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      hospital: new FormControl(null, Validators.required)
    });

    this.form.patchValue(this.doctor);
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }

    this.doctor.name = this.form.value.name;
    this.doctor.hospital = this.form.value.hospital;

    this.doctorService.addDoctor(this.doctor)
      .subscribe(doctor => console.log(doctor));
  }

}
