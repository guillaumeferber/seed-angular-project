import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeListComponent } from './badge-list.component';
import { BadgeComponent } from '../badge.component';


@NgModule({
  declarations: [
    BadgeListComponent,
    BadgeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BadgeListComponent,
    BadgeComponent
  ]
})
export class BadgeListModule { }
