import * as AuthActions from '../../../state/auth/actions/';
import { SnackbarService } from '../../../shared/services';
import * as fromAuth from '../../../state/auth/reducers/';
import { Component, OnInit } from '@angular/core';
import { Store, select, compose } from '@ngrx/store';
import { ICredentials } from '../../models';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromThemes from '../../../state/themes/reducers';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  errorMessage$: Observable<any>;
  isPending$: Observable<boolean>;
  theme: String;

  constructor(
    private store: Store<fromAuth.IState>,
    private snackBar: SnackbarService,
    private themes: Store<fromThemes.IState>) {
    this.errorMessage$ = store.pipe(
      select(fromAuth.getError),
      filter(err => err !== undefined)
    );
    this.isPending$ = store.pipe(select(fromAuth.getIsPending));
  }

  ngOnInit(): void {
    this.themes.pipe(select(fromThemes.getTheme)).subscribe(res => this.theme = res);
  }

  login(credentials: ICredentials) {
    this.store.dispatch(new AuthActions.Login(credentials));

    this.errorMessage$.subscribe(
      response => this.snackBar.showMessage(response.error.message || 'No server connection.')
    );
  }
}
