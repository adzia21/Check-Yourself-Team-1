import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizRoutingModule } from './quiz-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

import { QuizSolveComponent } from 'src/app/pages/quiz/quiz-solve/quiz-solve.component';
import { MultiChoiceQuestionComponent } from 'src/app/pages/quiz/quiz-solve/multi-choice-question/multi-choice-question.component';
import { CompleteSentenceQuestionComponent } from 'src/app/pages/quiz/quiz-solve/complete-sentence-question/complete-sentence-question.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    QuizSolveComponent,
    MultiChoiceQuestionComponent,
    CompleteSentenceQuestionComponent
  ],
  imports: [
    AngularMaterialModule, // all angular material modules in one place for readability
    QuizRoutingModule,
    NgbModule,
    CommonModule
  ],
  providers: []
})
export class QuizModule { }
