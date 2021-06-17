import { NgModule } from '@angular/core';
import { FilterDirective } from './filter/filter.directive';


@NgModule({
  exports: [FilterDirective],
  declarations: [FilterDirective],
})
export class DirectiveModule { }
