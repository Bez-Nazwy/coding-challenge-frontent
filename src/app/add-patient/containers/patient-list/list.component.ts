import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PatientService } from '../../services';
import { IPatient } from '../../models/IPatient';
import { Doctor } from '../../models/doctor.enum';
import { SnackbarService } from 'src/app/shared/services';
import { Store, select } from '@ngrx/store';
import * as fromThemes from '../../../state/themes/reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PatientListComponent implements OnInit {

  list: IPatient[] = [];
  doctor: string;
  myPatient: IPatient;
  Doctor = Doctor;
  theme: String;

  constructor(
    private service: PatientService,
    private snackbar: SnackbarService,
    private themes: Store<fromThemes.IState>,
  ) { }

  ngOnInit() {
    this.list = this.service.list;
    this.myPatient = this.service.patient;
    this.doctor = this.service.patient.doctor;
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.service.list, event.previousIndex, event.currentIndex);
  }

  postData() {
    const position = this.list.indexOf(this.myPatient);
    this.myPatient.priority = position;
    this.service.postPatient(this.myPatient).subscribe(
      res => {
        this.service.credentials = res;
        this.service.redirectToInfo();
      },
      err => {
        this.snackbar.showMessage(err.error.message);
      }
    );
  }
}
