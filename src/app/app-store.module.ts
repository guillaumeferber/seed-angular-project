import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromSeedReducers from './store/reducers/seed/seed.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    StoreModule.forRoot({ seed: fromSeedReducers.reducer }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  exports: [
    StoreModule
  ]
})
export class AppStoreModule { }
