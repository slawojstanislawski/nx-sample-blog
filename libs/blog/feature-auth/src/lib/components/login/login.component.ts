import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Observable, Subscription} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {
  AuthEffects,
  AuthFacade,
  LoginCredentials
} from '@blog/shared/auth/data-access';
import {SnackbarService} from '@blog/shared/snackbar';
import {
  ErrorToIndicatorMapper,
  IErrorToIndicatorMapper
} from '@blog/shared/error-mapper';

@AutoUnsubscribe()
@Component({
  selector: 'blog-ft-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  successSubscription: Subscription;
  errorSubscription: Subscription;
  loading$: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authFacade: AuthFacade,
    private readonly authEffects: AuthEffects,
    private readonly snackbarService: SnackbarService,
    @Inject(ErrorToIndicatorMapper)
    private readonly errToSnackbarMapper: IErrorToIndicatorMapper
  ) {}

  ngOnInit() {
    this.loading$ = this.authFacade.loading$;
    this.formGroup = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required)
    });
    this.successSubscription = this.authEffects.loginSuccess$
      .pipe(first())
      .subscribe(() => this.router.navigate(['/posts']));
    this.errorSubscription = this.authFacade.error$
      .pipe(map(this.errToSnackbarMapper))
      .subscribe();
  }

  ngOnDestroy(): void {}

  login() {
    if (!this.formGroup.valid) {
      this.snackbarService.failure('The form is invalid');
      return;
    }
    const credentials: LoginCredentials = this.formGroup.value;
    credentials.password.toLowerCase();
    credentials.username.toLowerCase();
    this.authFacade.login(credentials);
  }
}
