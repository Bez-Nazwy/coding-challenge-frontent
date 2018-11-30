import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services';
import { IPatient } from '../../models/IPatient';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

  patient: IPatient = {
    name: '',
    surname: '',
    diagnose: '',
    serviceTime: 0,
    peselNumber: '',
    doctor: ''
  };

  doctors: string[] = ['OCULIST', 'INTERLIST', 'DERMATOLOGIST'];

  constructor(private service: PatientService) { }

  ngOnInit() {
  }

  sendData() {
    this.service.patient = this.patient;
  }
}
