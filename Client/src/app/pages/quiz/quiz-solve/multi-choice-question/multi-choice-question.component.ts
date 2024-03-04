import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { images } from 'src/app/shared/constants/constants';
import { QuizResolve, QuizSolve } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-multi-choice-question',
  templateUrl: './multi-choice-question.component.html',
  styleUrls: ['./multi-choice-question.component.scss']
})
export class MultiChoiceQuestionComponent {
  @Input() colors!: string[];
  @Input() backgroundImages!: string[];
  @Input() quiz!: QuizSolve;
  @Input() questionNumber!: number;
  @Input() isLastQuestion: boolean = false;
  @Input() questionImage: string = `${images}/mockQuestion.png`;
  @Output() questionChanged: EventEmitter<QuizResolve> = new EventEmitter<QuizResolve>();
  @ViewChild('scrollTo') scrollTo!: ElementRef;

  public pickedOptions: string[] = []

  constructor() { }

  public toggleChoice(option: string) {
    this.pickedOptions.includes(option) ? this.unToggleChoice(option) : this.pickedOptions.push(option);
  }

  private unToggleChoice(choice: string) {
    this.pickedOptions.splice(this.pickedOptions.indexOf(choice), 1);
  }

  public isSelected(option: string): boolean {
    return this.pickedOptions.includes(option)
  }

  nextQuestion(id: number) {
    this.questionChanged.emit({
      questionId: id,
      answers: this.pickedOptions
    })
    this.pickedOptions = [];
  }

}
