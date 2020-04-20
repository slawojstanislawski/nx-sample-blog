import {createEffect, Actions, ofType} from '@ngrx/effects';
import {DataPersistence} from '@nrwl/angular';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {AuthService} from '../services/auth.service';
import {JWT_TOKEN_KEY} from '../shared/constants';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.dataPersistence.fetch(AuthActions.login, {
      run: (
        action: ReturnType<typeof AuthActions.login>,
        state: fromAuth.AuthPartialState
      ) => {
        return this.authService.login(action.credentials).pipe(
          map((response: {[JWT_TOKEN_KEY]: string}) => {
            return AuthActions.loginSuccess({token: response[JWT_TOKEN_KEY]});
          })
        );
      },

      onError: (action: ReturnType<typeof AuthActions.login>, error) =>
        AuthActions.loginFailure({error})
    })
  );

  loginSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(AuthActions.loginSuccess)),
    {dispatch: false}
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly dataPersistence: DataPersistence<fromAuth.AuthPartialState>
  ) {}
}
