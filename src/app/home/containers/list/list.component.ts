import { Component, OnInit, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromThemes from '../../../state/themes/reducers';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeService } from '../../services';
import { SnackbarService } from 'src/app/shared/services';
import { Doctor } from 'src/app/add-patient/models/doctor.enum';

export interface DialogData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  theme: String;
  @Input() doctor = '';
  @Input() patients = [''];
  Doctor = Doctor;

  constructor(
    private themes: Store<fromThemes.IState>,
    private dialog: MatDialog,
    private service: HomeService
  ) { }

  ngOnInit() {
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
  }

  openDialog(id, name, surname): void {
    const dialogRef = this.dialog.open(ListDiaglogComponent, {
      width: '500px',
      data: { id: id, name: `${name} ${surname}` }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editList() {
    this.service.redirectToList(this.doctor);
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class ListDiaglogComponent {

  constructor(
    public dialogRef: MatDialogRef<ListDiaglogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: HomeService,
    private snackbar: SnackbarService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.service.deletePatient(this.data.id).subscribe(
      res => {
        this.snackbar.showMessage('Użytkownik został wypisany.');
        this.dialogRef.close();
      },
      err => {
        this.snackbar.showMessage(err.error.message || 'Błąd serwera.');
        this.dialogRef.close();
      }
    );
  }
}
