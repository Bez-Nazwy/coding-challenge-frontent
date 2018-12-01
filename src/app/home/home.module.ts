import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent, ListComponent, EditComponent } from './containers';
import { ThemesModule } from '../themes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListDiaglogComponent } from './containers/list/list.component';
import { HomeDiaglogComponent } from './containers/edit/edit.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ThemesModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    ListComponent,
    ListDiaglogComponent,
    HomeDiaglogComponent,
    EditComponent
  ],
  entryComponents: [ ListDiaglogComponent, HomeDiaglogComponent]
})
export class HomeModule { }
