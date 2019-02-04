import { NgModule } from '@angular/core';

// Modules
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graphics1Component,
    ProgressComponent
  ],
  exports: [
    DashboardComponent,
    Graphics1Component,
    ProgressComponent
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
