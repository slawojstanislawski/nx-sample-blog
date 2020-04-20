import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {BreakpointState} from '@angular/cdk/layout/breakpoints-observer';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthFacade} from '@blog/shared/auth/data-access';

@Component({
  selector: 'blog-ft-shell-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  authenticated$: Observable<boolean>;
  toolbarHeight$: Observable<number>;

  constructor(
    private readonly authFacade: AuthFacade,
    private readonly breakpointObserver: BreakpointObserver
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

  toggleDrawer(): void {
    this.sidenav.toggle();
  }
}
