import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState, AuthPartialState} from './auth.reducer';
import {AUTH_FEATURE_KEY} from '../shared/constants.js';

export const getAuthState = createFeatureSelector<AuthPartialState, AuthState>(
  AUTH_FEATURE_KEY
);

export const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);

export const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

export const getToken = createSelector(
  getAuthState,
  (state: AuthState) => state.token
);
