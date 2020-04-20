import {JwtHelperService} from '@auth0/angular-jwt';
import {select, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {LoginCredentials} from '@blog/shared/auth/data-access';
import * as AuthSelectors from './auth.selectors';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  loading$ = this.store.pipe(select(AuthSelectors.getLoading));
  error$ = this.store.pipe(select(AuthSelectors.getError));
  token$ = this.store.pipe(select(AuthSelectors.getToken));
  isLoggedIn$ = this.token$.pipe(
    map(token => !!token && !this.jwtHelperService.isTokenExpired(token))
  );

  constructor(
    private readonly store: Store<fromAuth.AuthPartialState>,
    private readonly jwtHelperService: JwtHelperService
  ) {}

  login(credentials: LoginCredentials): void {
    this.store.dispatch(AuthActions.login({credentials}));
  }
}
