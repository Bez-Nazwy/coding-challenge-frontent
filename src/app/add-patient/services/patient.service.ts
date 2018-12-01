import { Injectable } from '@angular/core';
import { IPatient } from '../models/IPatient';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/auth/services';
import { SnackbarService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  list: IPatient[] = [
    // {
    //   name: 'Jakub3',
    //   surname: 'Dudycz',
    //   peselNumber: '97082503431',
    //   diagnose: 'Złamany huj',
    //   serviceTime: 5,
    //   doctor: 'DERMATOLOGIST',
    //   priority: 2
    // },
    // {
    //   name: 'Maciej',
    //   surname: 'Hajduk',
    //   peselNumber: '97082503431',
    //   diagnose: 'Złamany kark',
    //   serviceTime: 5,
    //   doctor: 'DERMATOLOGIST',
    //   priority: 2
    // }
  ];

  patient: IPatient = {
    name: '',
    surname: '',
    diagnose: '',
    serviceTime: 0,
    peselNumber: '',
    doctor: ''
  };

  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient,
    private snackbar: SnackbarService) { }

  private BASE_URL = environment.api_url;

  getList(): Observable<any> {
    const doctor = this.patient.doctor.toLowerCase();
    const url = `${this.BASE_URL}/api/patients/${doctor}`;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.get(url, options);
  }

  postPatient(patient: IPatient): Observable<any> {
    const url = `${this.BASE_URL}/api/patients`;
    const body = patient;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.post(url, body, options);
  }

  redirect() {
    this.getList().subscribe(
      res => {
        this.list = res;
        this.list.push(this.patient);
        this.router.navigate(['add-patient-list']);
      },
      err => { this.snackbar.showMessage(err.error.message); }
    );
  }
}
