import { Injectable } from '@angular/core';
import { IPatient } from '../models/IPatient';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/auth/services';
import { SnackbarService } from 'src/app/shared/services';
import { ICredentials } from '../models/ICredentials';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  list: IPatient[] = [];
  credentials: ICredentials;
  patient: IPatient;

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

  redirectToList() {
    this.getList().subscribe(
      res => {
        this.list = res;
        this.list.push(this.patient);
        this.router.navigate(['add-patient-list']);
      },
      err => { this.snackbar.showMessage(err.error.message); }
    );
  }

  redirectToInfo() {
    this.router.navigate(['add-patient-info']);
  }
}
