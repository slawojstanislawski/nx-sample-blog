import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { EffectsModule } from "@ngrx/effects";
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import { AuthEffects } from "@blog/shared/auth/data-access";
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@blog/blog/feature-shell').then(
              module => module.BlogFeatureShellModule
            )
        }
      ],
      {initialNavigation: 'enabled'}
    ),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
