import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../state/app/app.interface';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../../state/auth/reducers/';
import { Observable, interval } from 'rxjs';
import * as fromThemes from '../../../state/themes/reducers';
import { startWith, switchMap } from 'rxjs/operators';
import { HomeService } from '../../services';
import { SnackbarService } from 'src/app/shared/services';
import { Doctor } from 'src/app/add-patient/models/doctor.enum';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email$: Observable<string>;
  theme: String;
  list: any = [null];
  Doctor = Doctor;

  constructor(
    private store: Store<AppState>,
    private themes: Store<fromThemes.IState>,
    private service: HomeService,
    private snackbar: SnackbarService) {
    this.email$ = this.store.pipe(select(fromAuth.getEmail));
  }

  doctors = (): Array<string> => (Object.keys(Doctor));

  ngOnInit(): void {
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);

    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.service.getList())
      )
      .subscribe(
        response => {
          this.list = response;
        },
        err => {
          this.snackbar.showMessage(err.error.message);
        }
      );
  }

  getList(doctor: Doctor) {
    return (this.list[doctor]);
  }
}
