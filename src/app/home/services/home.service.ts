import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/auth/services';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) { }

  private BASE_URL = environment.api_url;

  getList(): Observable<any> {
    const url = `${this.BASE_URL}/api/patients`;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.get(url, options);
  }

  deletePatient(id): Observable<any> {
    const url = `${this.BASE_URL}/api/patients`;
    const token = this.auth.getToken();
    const options = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) };
    return this.http.delete(url, options);
  }
}
