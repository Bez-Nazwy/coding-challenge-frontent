import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PatientService } from '../../services';
import { IPatient } from '../../models/IPatient';
import { Doctor } from '../../models/doctor.enum';

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

  constructor(private service: PatientService) { }

  ngOnInit() {
    this.list = this.service.list;
    this.myPatient = this.service.patient;
    this.doctor = this.service.patient.doctor;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.service.list, event.previousIndex, event.currentIndex);
  }

  postData() {
    // console.log(this.service.list);
    const position = this.list.indexOf(this.myPatient);
    console.log(position);
    this.myPatient.priority = position;
    console.log(this.myPatient);
  }
}
