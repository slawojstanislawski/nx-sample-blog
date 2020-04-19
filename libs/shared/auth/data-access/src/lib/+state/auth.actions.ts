import {Action} from '@ngrx/store';

import {IApiError} from '@blog/shared/data-access';
import {LoginCredentials} from '../shared/types';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(readonly payload: LoginCredentials) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(readonly payload: string) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(readonly payload: IApiError) {}
}

export type AuthAction = Login | LoginSuccess | LoginFailure;

export const fromAuthActions = {
  Login,
  LoginSuccess,
  LoginFailure
};
