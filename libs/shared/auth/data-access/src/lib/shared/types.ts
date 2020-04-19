export interface LoginResponse {
  jwt_token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
}

export interface IJwtTokenPayload {
  username: string;
  sub: string; // user Id
}

export interface IAuthenticatedUserData {
  id: string;
  username: string;
}

export interface IAuthConfig {
  /**
   * Should a redirection take place when AuthenticationGuard's canActivate returns false
   */
  redirectAfterLogin: boolean;
  /**
   * If redirectAfterLogin===true, what path should be the redirection's target
   */
  redirectPath?: string;
  /**
   * syncTokenStorage: sessionStorage | localStorage | custom implementation of the Storage interface
   */
  syncTokenStorage: Storage;
}
