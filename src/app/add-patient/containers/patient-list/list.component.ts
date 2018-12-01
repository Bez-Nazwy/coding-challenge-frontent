import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PatientService } from '../../services';
import { IPatient } from '../../models/IPatient';
import { Doctor } from '../../models/doctor.enum';
import { SnackbarService } from 'src/app/shared/services';

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

  constructor(private service: PatientService, private snackbar: SnackbarService) { }

  ngOnInit() {
    this.list = this.service.list;
    this.myPatient = this.service.patient;
    this.doctor = this.service.patient.doctor;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.service.list, event.previousIndex, event.currentIndex);
  }

  postData() {
    const position = this.list.indexOf(this.myPatient);
    this.myPatient.priority = position;
    this.service.postPatient(this.myPatient).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.snackbar.showMessage(err.error.message);
      }
    )
  }
}
