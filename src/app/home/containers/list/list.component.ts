import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromThemes from '../../../state/themes/reducers';

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
  ) { }

  ngOnInit() {
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);

  }

}
