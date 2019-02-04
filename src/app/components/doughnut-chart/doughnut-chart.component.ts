import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html'
})
export class DoughnutChartComponent {

  @Input() title: string;
  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];

}
