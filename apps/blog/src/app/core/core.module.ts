import {NgModule, Optional, SkipSelf} from '@angular/core';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NxModule} from '@nrwl/angular';

import {
  SharedAuthDataAccessModule,
  AuthTokenGetter,
  defaultAuthConfig,
  syncTokenMetaReducerFactory,
  AUTH_FEATURE_KEY,
  reducer as authReducer,
  AuthEffects
} from '@blog/shared/auth/data-access';
import {BlogDataAccessErrorHandlerModule} from '@blog/data-access-error-handler';
import {SharedDataAccessModule} from '@blog/shared/data-access';
import {environment} from '../../environments/environment';
import {SharedSnackbarModule} from '@blog/shared/snackbar';

@NgModule({
  imports: [
    HttpClientModule,
    SharedDataAccessModule.forRoot({apiBasePath: '/api'}),
    SharedSnackbarModule.forFeature({snackbarDuration: 3000}),
    BlogDataAccessErrorHandlerModule,
    SharedAuthDataAccessModule.forRoot({
      ...defaultAuthConfig,
      redirectAfterLogin: true,
      redirectPath: '/auth/login',
      syncTokenStorage: localStorage
    }),
    StoreModule.forRoot(
      {
        [AUTH_FEATURE_KEY]: authReducer
      },
      {
        metaReducers: [
          syncTokenMetaReducerFactory({
            storage: localStorage
          })
        ],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    NxModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: tokenGetter => {
          return {tokenGetter};
        },
        deps: [AuthTokenGetter]
      }
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  exports: [HttpClientModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. You should only import Core modules in the AppModule only.'
      );
    }
  }
}
