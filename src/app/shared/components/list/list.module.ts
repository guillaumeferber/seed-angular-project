import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemModule } from './list-item/list-item.module';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListItemModule
  ],
  exports: [ListItemModule, ListComponent]
})
export class ListModule { }
