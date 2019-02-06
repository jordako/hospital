import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', description: 'Página de dashboard' }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'ProgressBar', description: 'Página de progress bar' }
      },
      {
        path: 'graphics1',
        component: Graphics1Component,
        data: { title: 'Gráficas', description: 'Página de gráficas' }
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Promesas', description: 'Página de promesas' }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { title: 'RxJs', description: 'Página de RxJs' }
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Ajustes del tema',
        description: 'Página de ajustes del tema' }
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
