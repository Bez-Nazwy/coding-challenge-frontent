
import { AuthGuard } from './auth';
import { NgModule } from '@angular/core';
import { HomeModule, HomeComponent, ListComponent, EditComponent } from './home';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent, LoginPageComponent } from './auth/containers';
import { InfoComponent, BadRequestComponent, PasswordResetComponent } from './shared/containers';
import { PatientDataComponent, PatientListComponent } from './add-patient/containers';
import { PatientInfoComponent } from './add-patient/components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'reset-pass',
    component: PasswordResetComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-patient',
    component: PatientDataComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-list',
    component: EditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-patient-list',
    component: PatientListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-patient-info',
    component: PatientInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: '404',
    component: BadRequestComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, {
      useHash: true,
      enableTracing: false,
    }),
    HomeModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
