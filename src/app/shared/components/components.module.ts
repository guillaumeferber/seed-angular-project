import { NgModule } from '@angular/core';
import { BadgeListModule } from './badge/badge-list/badge-list.module';
import { ListModule } from './list/list.module';


@NgModule({
  imports: [
    BadgeListModule,
    ListModule
],
  exports: [
    BadgeListModule,
    ListModule
],
})
export class ComponentsModule { }
