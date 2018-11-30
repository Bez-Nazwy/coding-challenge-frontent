import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDataComponent } from './containers';
import { ThemesModule } from '../themes';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    PatientDataComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ThemesModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
  ]
})
export class AddPatientModule { }
