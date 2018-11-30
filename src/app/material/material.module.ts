import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatMenuModule,
  MatExpansionModule,
  MatStepperModule,
  MatTooltipModule,
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatStepperModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    DragDropModule
  ],
  exports: [
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    DragDropModule
  ],
})
export class MaterialModule { }
