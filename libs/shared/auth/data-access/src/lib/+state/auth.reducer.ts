import {LocalStorageConfig, localStorageSync} from 'ngrx-store-localstorage';
import {createReducer, on, Action, ActionReducer} from '@ngrx/store';

import * as AuthActions from './auth.actions';
import {
  AUTH_FEATURE_KEY,
  defaultStorageConfig,
  TOKEN_KEY
} from '../shared/constants';

export interface AuthState {
  [TOKEN_KEY]: string;
  loading: boolean;
  error?: any;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState = {
  token: '',
  loading: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({...state, token: '', loading: true})),
  on(AuthActions.loginSuccess, (state, {token}) => ({
    ...state,
    token,
    loading: false
  })),
  on(AuthActions.logout, state => ({...state, token: ''})),
  on(AuthActions.loginFailure, (state, {error}) => ({
    ...state,
    token: '',
    loading: false,
    error
  }))
);

export const syncTokenMetaReducerFactory = (
  storageConfigOverrides: Partial<LocalStorageConfig> = {}
) => {
  return (reducerFunction: ActionReducer<any>): ActionReducer<any> => {
    return localStorageSync({
      ...defaultStorageConfig,
      ...storageConfigOverrides
    })(reducerFunction);
  };
};

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
