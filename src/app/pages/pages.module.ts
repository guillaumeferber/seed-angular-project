import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    LoginModule,
    CommonModule
  ]
})
export class PagesModule { }
