import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services';
import { IPatient } from '../../models/IPatient';
import { Store, select } from '@ngrx/store';
import * as fromThemes from '../../../state/themes/reducers';
import { Doctor } from '../../models/doctor.enum';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

  theme: String;

  patient: IPatient = {
    name: '',
    surname: '',
    diagnose: '',
    serviceTime: 0,
    peselNumber: '',
    doctor: ''
  };

  Doctor = Doctor;

  doctors = (): Array<string> => (Object.keys(Doctor));

  constructor(private service: PatientService,
    private store: Store<fromThemes.IState>) { }

  ngOnInit() {
    this.store.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
  }

  sendData() {
    this.service.patient = this.patient;
    this.service.redirectToList();
  }

  validate = () => (typeof(this.patient.serviceTime) === 'number')
}
