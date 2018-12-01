import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromThemes from '../../../state/themes/reducers';
import { PatientService } from '../../services';
import { ICredentials } from '../../models/ICredentials';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  theme: String;
  credentials: ICredentials;

  constructor(
    private service: PatientService,
    private store: Store<fromThemes.IState>) { }

  ngOnInit(): void {
    this.credentials = this.service.credentials;
    this.store.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
  }
}
