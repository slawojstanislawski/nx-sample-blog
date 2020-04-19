import {JwtHelperService} from '@auth0/angular-jwt';
import {select, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {LoginCredentials} from '../shared/types';
import {AuthPartialState} from './auth.reducer';
import {authQuery} from './auth.selectors';
import {Login} from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  loading$ = this.store.pipe(select(authQuery.getLoading));
  error$ = this.store.pipe(select(authQuery.getError));
  token$ = this.store.pipe(select(authQuery.getToken));
  isLoggedIn$ = this.token$.pipe(
    map(token => !!token && !this.jwtHelperService.isTokenExpired(token))
  );

  constructor(
    private readonly store: Store<AuthPartialState>,
    private readonly jwtHelperService: JwtHelperService
  ) {}

  login(credentials: LoginCredentials): void {
    this.store.dispatch(new Login(credentials));
  }
}
