import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() doctor = '';
  @Input() patients = [''];

  constructor() { }

  ngOnInit() {
  }

}
