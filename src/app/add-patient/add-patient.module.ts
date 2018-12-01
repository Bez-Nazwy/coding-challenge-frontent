import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDataComponent, PatientListComponent,  } from './containers';
import { ThemesModule } from '../themes';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PatientInfoComponent } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PatientDataComponent,
    PatientListComponent,
    PatientInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ThemesModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
  ]
})
export class AddPatientModule { }
