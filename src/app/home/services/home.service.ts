import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/auth/services';
import { IPatient } from 'src/app/add-patient/models/IPatient';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  list: IPatient[] = [];
  doctor = '';

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  private BASE_URL = environment.api_url;

  getOneList(doc): Observable<any> {
    const doctor = doc.toLowerCase();
    const url = `${this.BASE_URL}/api/patients/${doctor}`;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.get(url, options);
  }

  getAllList(): Observable<any> {
    const url = `${this.BASE_URL}/api/patients`;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.get(url, options);
  }

  deletePatient(id): Observable<any> {
    const url = `${this.BASE_URL}/api/patients/${id}`;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.delete(url, options);
  }

  altDeletePatient(id): Observable<any> {
    const url = `${this.BASE_URL}/api/patients/edit/${id}`;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.delete(url, options);
  }

  altAddPatient(patient: IPatient): Observable<any> {
    const url = `${this.BASE_URL}/api/patients/edit`;
    const body = patient;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.post(url, body, options);
  }

  redirectToList(doctor) {
    this.doctor = doctor;
    this.getOneList(doctor).subscribe(
      res => {
        // console.log(res);
        this.list = res;
        this.router.navigate(['edit-list']);
      },
      err => { this.snackbar.showMessage(err.error.message); }
    );
  }
}
