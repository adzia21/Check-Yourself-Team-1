import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
} from 'chart.js/auto';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit, AfterViewInit {

  @Input() timeTaken: string = '00:00';

  public doughnutChartLabels: string[] = ['No', 'Yes'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [350, 100] }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
