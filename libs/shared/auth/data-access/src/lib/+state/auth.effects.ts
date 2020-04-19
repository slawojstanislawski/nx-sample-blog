import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import {HttpErrorResponse} from '@angular/common/http';
import {DataPersistence} from '@nrwl/angular';
import {Injectable} from '@angular/core';
import { exhaustMap, map, switchMap, tap } from "rxjs/operators";

import {AuthPartialState} from './auth.reducer';
import {
  Login,
  LoginFailure,
  AuthActionTypes,
  LoginSuccess
} from './auth.actions';
import {AuthService} from '../services/auth.service';
import {JWT_TOKEN_KEY} from '../shared/constants';
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class AuthEffects {

  $whatever = this.actions$.subscribe(a => console.log({a}))

  login$ = createEffect(() => {
    return this.dataPersistence.fetch(AuthActionTypes.Login, {
      run: (action: Login, state: AuthPartialState) => {
        console.log('blaaaah');
        return this.authService.login(action.payload).pipe(
          map((response: {[JWT_TOKEN_KEY]: string}) => {
            console.log('bleeeeeh')
            return new LoginSuccess(response[JWT_TOKEN_KEY]);
          })
        );
      },

      onError: (action: Login, error: HttpErrorResponse) => {
        return new LoginFailure(error.error);
      }
    }).pipe(
      tap((what) => console.log({what}))
    )
  })

  // @Effect() login$ = this.dataPersistence.fetch(AuthActionTypes.Login, {
  //   run: (action: Login, state: AuthPartialState) => {
  //     // return {
  //     //   type: 'dupsko'
  //     // }
  //     // console.log("dupsko wredne");
  //     // console.log("action", action);
  //     return this.authService.login(action.payload).pipe(
  //       // tap((a) => {
  //       //   console.log('my action', a)
  //       // }),
  //       map((response: {[JWT_TOKEN_KEY]: string}) => {
  //         console.log("here fuck");
  //         return {
  //           type: 'dupa',
  //           payload: {
  //             hello: 'fuckyou'
  //           }
  //         };
  //       })
  //     );
  //   },
  //
  //   // onError: (action: Login, error: HttpErrorResponse) => {
  //   //   return {
  //   //     type: 'shit',
  //   //     payload: {shit: 'fuck'}
  //   //   }
  //   //   // return new LoginFailure(error.error);
  //   // }
  // });

  @Effect({dispatch: false}) loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess)
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly dataPersistence: DataPersistence<AuthPartialState>
  ) {}
}
