import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../state/app/app.interface';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../../state/auth/reducers/';
import { Observable } from 'rxjs';
import * as fromThemes from '../../../state/themes/reducers';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email$: Observable<string>;
  theme: String;

  doctor = 'Doctor Who';

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  constructor(
    private store: Store<AppState>,
    private themes: Store<fromThemes.IState>) {
    this.email$ = this.store.pipe(select(fromAuth.getEmail));
  }

  ngOnInit(): void {
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
  }
}
