import {LocalStorageConfig} from 'ngrx-store-localstorage';
import {IAuthConfig} from './types';

export const AUTH_FEATURE_KEY = 'auth';
export const JWT_TOKEN_KEY = 'jwt_token';
export const TOKEN_KEY = 'token';

export const defaultAuthConfig: IAuthConfig = {
  redirectAfterLogin: false,
  syncTokenStorage: sessionStorage
};

export const defaultStorageConfig: LocalStorageConfig = {
  keys: [
    {
      [AUTH_FEATURE_KEY]: [TOKEN_KEY]
    }
  ],
  rehydrate: true,
  storage: sessionStorage
};
