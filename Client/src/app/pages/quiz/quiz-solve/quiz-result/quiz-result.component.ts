import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartType,
} from 'chart.js/auto';
import { QuizResult } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit, AfterViewInit {
  @Input() timeTaken: string = '00:00';
  @Input() result!: QuizResult;

  public doughnutChartLabels: string[] = ['Niepoprawne', 'Poprawne'];
  public doughnutChartData!: ChartData<'doughnut'>;
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

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [this.result.incorrectAnswer, this.result.correctAnswer] }],
    };

    this.ref.detectChanges();
  }
}
