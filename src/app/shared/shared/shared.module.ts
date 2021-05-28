import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [ConfirmdialogComponent],
  imports: [
    CommonModule,MaterialModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
