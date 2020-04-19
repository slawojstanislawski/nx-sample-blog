import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  AUTH_FEATURE_KEY,
  defaultAuthConfig,
  TOKEN_KEY,
} from './shared/constants';
import {AuthConfig, AuthTokenGetter} from './shared/injection-tokens';
import {IsAuthenticatedGuard} from './guards/is-authenticated.guard';
import {AuthService} from './services/auth.service';
import {AuthFacade} from './+state/auth.facade';
import {IAuthConfig} from './shared/types';

@NgModule({
  imports: [CommonModule],
})
export class SharedAuthDataAccessModule {
  static forRoot(
    config: IAuthConfig = defaultAuthConfig
  ): ModuleWithProviders<SharedAuthDataAccessModule> {
    return {
      providers: [
        AuthService,
        AuthFacade,
        IsAuthenticatedGuard,
        {
          provide: AuthConfig,
          useValue: config,
        },
        {
          provide: AuthTokenGetter,
          useFactory: (authConfig: IAuthConfig) => {
            return () => {
              const syncedAuthState = authConfig.syncTokenStorage.getItem(
                AUTH_FEATURE_KEY
              );
              if (syncedAuthState) {
                const authState = JSON.parse(syncedAuthState);
                return authState[TOKEN_KEY];
              }
              return '';
            };
          },
          deps: [AuthConfig],
        },
      ],
      ngModule: SharedAuthDataAccessModule,
    };
  }
}
