import {BreakpointState} from '@angular/cdk/layout/breakpoints-observer';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {AuthFacade} from '@blog/shared/auth/data-access';

@AutoUnsubscribe()
@Component({
  selector: 'blog-ft-shell-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  authenticated$: Observable<boolean>;
  toolbarHeight$: Observable<number>;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authFacade: AuthFacade,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.authenticated$ = this.authFacade.isLoggedIn$;
    this.toolbarHeight$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(
        map((state: BreakpointState) => {
          return state.matches ? 56 : 64;
        })
      );
  }

  ngOnDestroy(): void {}

  toggleDrawer(): void {
    this.sidenav.toggle();
  }

  logout(): void {
    this.authFacade.logout();
  }
}
