import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {
  ISharedDataAccessModuleConfig,
  SharedDataAccessModuleConfig
} from '@blog/shared/data-access';
import {LoginCredentials, LoginResponse} from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject(SharedDataAccessModuleConfig)
    private readonly dataAccessConfig: ISharedDataAccessModuleConfig
  ) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.dataAccessConfig.apiBasePath}/login`,
      credentials
    );
  }
}
