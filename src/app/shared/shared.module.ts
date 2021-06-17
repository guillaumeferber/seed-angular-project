import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { DirectiveModule } from './directives/directives.module';


@NgModule({
  imports: [
    ComponentsModule,
    DirectiveModule
],
  exports: [
    ComponentsModule,
    DirectiveModule
],
})
export class SharedModule { }
