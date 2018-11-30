import { Injectable } from '@angular/core';
import { IPatient } from '../models/IPatient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patient: IPatient = {
    name: '',
    surname: '',
    diagnose: '',
    serviceTime: 0,
    peselNumber: '',
    doctor: ''
  };

  constructor() { }

}
