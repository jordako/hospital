import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard, AdminGuard, VerifyTokenGuard } from '../services';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Dashboard', description: 'Página de dashboard' }
    }, {
      path: 'progress',
      component: ProgressComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'ProgressBar', description: 'Página de progress bar' }
    }, {
      path: 'graphics1',
      component: Graphics1Component,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Gráficas', description: 'Página de gráficas' }
    }, {
      path: 'promises',
      component: PromisesComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Promesas', description: 'Página de promesas' }
    }, {
      path: 'rxjs',
      component: RxjsComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'RxJs', description: 'Página de RxJs' }
    }, {
      path: 'account-settings',
      component: AccountSettingsComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Ajustes del tema', description: 'Página de ajustes del tema'}
    }, {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Perfil de usuario', description: 'Página de perfil de usuario' }
    }, {
      path: 'search/:term',
      component: SearchComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Buscador', description: 'Página de buscador' }
    }, {
      path: 'users',
      component: UsersComponent,
      canActivate: [AdminGuard, VerifyTokenGuard],
      data: { title: 'Mantenimiento de usuarios', description: 'Página de mantenimiento de usuarios' }
    }, {
      path: 'hospitals',
      component: HospitalsComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Mantenimiento de hospitales', description: 'Página de mantenimiento de hospitales' }
    }, {
      path: 'doctors',
      component: DoctorsComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Mantenimiento de médicos', description: 'Página de mantenimiento de médicos' }
    }, {
      path: 'doctor/:id',
      component: DoctorComponent,
      canActivate: [VerifyTokenGuard],
      data: { title: 'Actualizar médico', description: 'Página de actualizar médico' }
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
