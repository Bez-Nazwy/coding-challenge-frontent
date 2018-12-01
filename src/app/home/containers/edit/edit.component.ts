import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from '../../services';
import { SnackbarService } from 'src/app/shared/services';
import { Store, select } from '@ngrx/store';
import * as fromThemes from '../../../state/themes/reducers';
import { IPatient } from 'src/app/add-patient/models/IPatient';
import { Doctor } from 'src/app/add-patient/models/doctor.enum';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';


export interface PatientData {
  patient: IPatient;
  name: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  theme: String;
  list: IPatient[] = [];
  myPatient: IPatient;
  Doctor = Doctor;
  doctor: string;

  constructor(
    private service: HomeService,
    private dialog: MatDialog,
    private themes: Store<fromThemes.IState>,
  ) { }

  ngOnInit() {
    this.list = this.service.list;
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
    this.doctor = this.service.doctor;
  }

  drop(event: CdkDragDrop<string[]>) {
    this.list[event.previousIndex].priority = event.currentIndex;
    // console.log(event.currentIndex);
    this.openDialog(this.list[event.previousIndex]);
  }

  openDialog(patient): void {
    const dialogRef = this.dialog.open(HomeDiaglogComponent, {
      width: '500px',
      data: { patient: patient, name: `${patient.name} ${patient.surname}` }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class HomeDiaglogComponent {

  constructor(
    public dialogRef: MatDialogRef<HomeDiaglogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientData,
    private service: HomeService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['home']);
  }

  onYesClick() {
    this.dialogRef.close();
    this.service.altDeletePatient(this.data.patient.patientNumber).subscribe(
      res => {
        this.service.altAddPatient(this.data.patient).subscribe(
          _ => { this.snackbar.showMessage('Operacja zmienienia kolejki wykonana.'); },
          err => { this.snackbar.showMessage(err.error.message || 'Błąd serwera.'); });
      }, err => { this.snackbar.showMessage(err.error.message || 'Błąd serwera.'); });
    this.router.navigate(['home']);
  }
}
