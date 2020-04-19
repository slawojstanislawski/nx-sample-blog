import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Observable} from 'rxjs';

import {AuthFacade} from '@blog/shared/auth/data-access';

@Component({
  selector: 'blog-ft-shell-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;
  authenticated$: Observable<boolean>;

  constructor(private readonly authFacade: AuthFacade) {}

  ngOnInit() {
    this.authenticated$ = this.authFacade.isLoggedIn$;
  }

  toggleDrawer(): void {
    this.sidenav.toggle();
  }
}
