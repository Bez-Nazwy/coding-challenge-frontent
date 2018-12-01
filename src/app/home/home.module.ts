import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent, ListComponent } from './containers';
import { ThemesModule } from '../themes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DiaglogComponent } from './containers/list/list.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ThemesModule,
    FlexLayoutModule
  ],
  declarations: [
    HomeComponent,
    ListComponent,
    DiaglogComponent
  ],
  entryComponents: [ DiaglogComponent ]
})
export class HomeModule { }
