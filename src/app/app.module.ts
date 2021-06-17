import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { NavbarModule } from './layout/navbar/navbar.module';
import { FooterModule } from './layout/footer/footer.module';
import { DirectiveModule } from './shared/directives/directives.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    PagesModule,
    NavbarModule,
    FooterModule,
    DirectiveModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
