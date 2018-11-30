import { Injectable } from '@angular/core';
import { IPatient } from '../models/IPatient';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  list: IPatient[] = [
    {
      name: 'Jakub3',
      surname: 'Dudycz',
      peselNumber: '97082503431',
      diagnose: 'Złamany huj',
      serviceTime: 5,
      doctor: 'DERMATOLOGIST',
      priority: 2
    },
    {
      name: 'Maciej',
      surname: 'Hajduk',
      peselNumber: '97082503431',
      diagnose: 'Złamany kark',
      serviceTime: 5,
      doctor: 'DERMATOLOGIST',
      priority: 2
    }
  ];

  patient: IPatient = {
    name: '',
    surname: '',
    diagnose: '',
    serviceTime: 0,
    peselNumber: '',
    doctor: ''
  };

  constructor(private router: Router) { }

  redirect() {
    this.list.push(this.patient);
    this.router.navigate(['add-patient-list']);
  }

}
