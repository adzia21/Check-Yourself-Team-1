import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { images } from 'src/app/shared/constants/constants';
import { QuizResolve, QuizResult, QuizSolve } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-quiz-solve',
  templateUrl: './quiz-solve.component.html',
  styleUrls: ['./quiz-solve.component.scss'],
})
export class QuizSolveComponent {
  private areCorrectQuestions: boolean[] = [];

  alpha: number = 0.7;
  alphaStrong: number = 0.5;
  colors: string[] = [
    `rgba(66, 133, 244, ${this.alpha})`, //blue
    `rgba(151, 71, 255, ${this.alpha})`, //purple
    `rgba(191, 42, 72, ${this.alpha})`, //red
    `rgba(251, 188, 5, ${this.alphaStrong})`, //yellow
    `rgba(191, 42, 72, ${this.alpha})`, //red
    `rgba(251, 188, 5, ${this.alphaStrong})`, //yellow
    `rgba(66, 133, 244, ${this.alpha})`, //blue
    `rgba(151, 71, 255, ${this.alpha})`, //purple
  ];
  backgroundImages: string[] = [
    "url('/assets/icons/logo_svg_blue.svg')",
    "url('/assets/icons/logo_svg_purple.svg')",
    "url('/assets/icons/logo_svg_red.svg')",
    "url('/assets/icons/logo_svg_yellow.svg')",
    "url('/assets/icons/logo_svg_red.svg')",
    "url('/assets/icons/logo_svg_yellow.svg')",
    "url('/assets/icons/logo_svg_blue.svg')",
    "url('/assets/icons/logo_svg_purple.svg')",
  ];

  questionImage: string = `${images}/mock-question01.png`;

  questionNumber: number = 0;
  startTime: Date;
  public ellapsedTime = '00:00';
  private timer: any = null;
  public quiz!: QuizSolve;
  public quizAnsweres: QuizResolve[] = [];
  public result!: QuizResult;
  public showResultScreen: boolean = false;
  public timeTaken: string = '00:00';
  public isLastQuestion: boolean = false;

  constructor(private quizService: QuizService) {
    this.quizService.getQuiz(1).subscribe((res: QuizSolve) => this.quiz = res)
    // this.quiz = {
    //   quizId: 1,
    //   technology: 'Super Techno',
    //   title: 'Tyteł',
    //   time: 20,
    //   questions: [
    //     {
    //       questionId: 1,
    //       type: 'multiple choice',
    //       question: 'Tutaj pytanie tego typa?',
    //       answers: [
    //         'dziabu',
    //         'dabix',
    //         'dziop',
    //         'dziop2',
    //         'dziop3',
    //         'smuteg',
    //         'żal',
    //         'niedowierzanie',
    //       ],
    //     },
    //     {
    //       questionId: 2,
    //       type: 'multiple choice',
    //       question: 'Tutaj pytanie tego typa? awd',
    //       answers: [
    //         'dziabu ss',
    //         'dabix dd',
    //         'dziop ww',
    //         'smuteg sad',
    //         'żal awds',
    //         'niedowierzanie asdw',
    //       ],
    //     },
    //     {
    //       questionId: 3,
    //       type: 'finish sentence',
    //       question: 'Tutaj pytanie tego typa? awd',
    //       answers: [
    //         'dziabu ss',
    //         'dabix dd',
    //         'dziop ww',
    //         'smuteg sad',
    //         'żal awds',
    //         'niedowierzanie asdw',
    //       ],
    //     },
    //     {
    //       questionId: 4,
    //       type: 'finish sentence',
    //       question: 'Tutaj pytanie tego typa? awd',
    //       answers: [
    //         'dziabu ss',
    //         'dabix dd',
    //         'dziop ww',
    //         'smuteg sad',
    //         'żal awds',
    //         'niedowierzanie asdw',
    //       ],
    //     },
    //   ],
    // };

    this.startTime = new Date();
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  private tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.quiz.time*60) {
      this.resultScreen(true)
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  private parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  public onQuestionChanged(answeres: QuizResolve) {
    this.quizAnsweres.push(answeres);

    this.quiz.questions.length === this.questionNumber + 1
      ? this.resultScreen(false)
      : (this.questionNumber += 1);
    this.isLastQuestion =
      this.quiz.questions.length === this.questionNumber + 1;
  }

  private resultScreen(timeLimit: boolean) {
    clearInterval(this.timer)

    if (timeLimit) {
      console.log(this.quizAnsweres)
      let answered = this.quizAnsweres.length;
      let unanswered = this.quiz.questions.length - answered;
      
      for (let index = 0; index < unanswered; index++) {
        this.quizAnsweres.push({
          questionId: answered + index + 1,
          answers: ['']
        });
      }
      console.log(this.quizAnsweres)
      this.timeTaken = String(this.quiz.time);
      this.quizService.resolveQuiz(this.quizAnsweres).subscribe((res: QuizResult) => {
      this.result = res;
      this.showResultScreen = true;
    });
    } else {
      this.timeTaken = this.ellapsedTime;
      this.quizService.resolveQuiz(this.quizAnsweres).subscribe((res: QuizResult) => {
        this.result = res;
        this.showResultScreen = true;
      });
    }
    
  }
}
