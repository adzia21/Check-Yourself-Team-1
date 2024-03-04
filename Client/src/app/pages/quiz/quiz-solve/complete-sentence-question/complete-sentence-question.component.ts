import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { QuizResolve, QuizSolve } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-complete-sentence-question',
  templateUrl: './complete-sentence-question.component.html',
  styleUrls: ['./complete-sentence-question.component.scss']
})
export class CompleteSentenceQuestionComponent {
  @Input() questionNumber!: number;
  @Input() isLastQuestion: boolean = false;
  @Input() quiz!: QuizSolve;
  @Output() questionChanged: EventEmitter<QuizResolve> = new EventEmitter<QuizResolve>();
  @ViewChild('scrollTo') scrollTo!: ElementRef;

  private answered: string= '';
  
  constructor () { }

  public optionChosen(option: string) {
    this.answered = option;
  }
  
  nextQuestion(id: number) {
    this.scrollTo.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.questionChanged.emit({
      questionId: id,
      answers: [this.answered]
    })
  }
}
