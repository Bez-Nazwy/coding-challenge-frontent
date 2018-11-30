import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() doctor = '';
  @Input() patients = [''];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.patients, event.previousIndex, event.currentIndex);
    console.log(this.patients);
  }

  constructor() { }

  ngOnInit() {
  }

}
