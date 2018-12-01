import { Component, OnInit, Input, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromThemes from '../../../state/themes/reducers';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeService } from '../../services';
import { SnackbarService } from 'src/app/shared/services';

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

  constructor(
    private themes: Store<fromThemes.IState>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
  }

  openDialog(id, name, surname): void {
    const dialogRef = this.dialog.open(DiaglogComponent, {
      width: '500px',
      data: { id: id, name: `${name} ${surname}` }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: 'dialog-overview.html',
})
export class DiaglogComponent {

  constructor(
    public dialogRef: MatDialogRef<DiaglogComponent>,
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
        this.snackbar.showMessage(err.error.message);
        this.dialogRef.close();
      }
    );
  }
}
