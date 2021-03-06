# @ngrx/store-devtools

Store Devtools provides developer tools and instrumentation for Store.

## Installation
Detailed installation instructions can be found on the [Installation](https://ngrx.io/guide/store-devtools/install) page.

## Setup
Instrumentation with the Chrome / Firefox Extension

1. Download the [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension/)

2. In your AppModule add instrumentation to the module imports using StoreDevtoolsModule.instrument:

app.module.ts

    import { StoreDevtoolsModule } from '@ngrx/store-devtools';
    import { environment } from '../environments/environment'; // Angular CLI environment
    
    @NgModule({
      imports: [
        StoreModule.forRoot(reducers),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
        }),
      ],
    })
    export class AppModule {}
