import {CanActivate, Router} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {AuthConfig} from '../shared/injection-tokens';
import {AuthFacade} from '../+state/auth.facade';
import {IAuthConfig} from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    @Inject(AuthConfig) private readonly authConfig: IAuthConfig
  ) {}

  canActivate() {
    return this.authFacade.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          if (this.authConfig.redirectAfterLogin) {
            const redirectionPath = this.authConfig.redirectPath || '/';
            this.router.navigate([redirectionPath]);
          }
          return false;
        }
        return true;
      })
    );
  }
}
