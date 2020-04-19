import {LocalStorageConfig, localStorageSync} from 'ngrx-store-localstorage';
import {ActionReducer} from '@ngrx/store';

import {
  AUTH_FEATURE_KEY,
  defaultStorageConfig,
  TOKEN_KEY
} from '../shared/constants';
import {AuthAction, AuthActionTypes} from './auth.actions';

export interface AuthState {
  [TOKEN_KEY]: string;
  loading: boolean;
  error?: any;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  token: '',
  loading: false
};

export function reducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login: {
      state = {
        ...state,
        token: '',
        loading: true
      };
      break;
    }
    case AuthActionTypes.LoginSuccess: {
      state = {
        ...state,
        token: action.payload,
        loading: false
      };
      break;
    }
    case AuthActionTypes.LoginFailure: {
      state = {
        ...state,
        token: '',
        loading: false,
        error: action.payload
      };
      break;
    }
  }
  return state;
}

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
