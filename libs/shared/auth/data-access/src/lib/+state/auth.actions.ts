import {createAction, props} from '@ngrx/store';

import {IApiError} from '@blog/shared/data-access';
import {LoginCredentials} from '../shared/types';

export const login = createAction(
  '[Auth] Login',
  props<{credentials: LoginCredentials}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{token: string}>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{error: IApiError}>()
);
