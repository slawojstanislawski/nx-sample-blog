import {createFeatureSelector, createSelector} from '@ngrx/store';

import {AUTH_FEATURE_KEY} from '../shared/constants';
import {AuthState} from './auth.reducer';

// Lookup the 'auth' feature state managed by NgRx
const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

const getToken = createSelector(
  getAuthState,
  (state: AuthState) => state.token
);

const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);

const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

export const authQuery = {
  getLoading,
  getToken,
  getError
};
