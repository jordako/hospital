import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// Modules
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';
import { IncreaserComponent } from '../components/increaser/increaser.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graphics1Component,
    ProgressComponent,
    IncreaserComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent
  ],
  exports: [DashboardComponent, Graphics1Component, ProgressComponent],
  imports: [
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class PagesModule {}
