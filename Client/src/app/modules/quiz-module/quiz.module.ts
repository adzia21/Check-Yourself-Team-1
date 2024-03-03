import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuizRoutingModule } from './quiz-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

import { QuizSolveComponent } from 'src/app/pages/quiz/quiz-solve/quiz-solve.component';
import { MultiChoiceQuestionComponent } from 'src/app/pages/quiz/quiz-solve/multi-choice-question/multi-choice-question.component';
import { CompleteSentenceQuestionComponent } from 'src/app/pages/quiz/quiz-solve/complete-sentence-question/complete-sentence-question.component';
import { CommonModule } from '@angular/common';
import { QuizResultComponent } from 'src/app/pages/quiz/quiz-solve/quiz-result/quiz-result.component';
import { NgChartsModule } from 'ng2-charts';
import { QuizCreateComponent } from 'src/app/pages/quiz/quiz-create/quiz-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/helpers/interceptors/bearer.interceprot';
import { ToastrModule } from 'ngx-toastr';
import { QuizOverviewComponent } from 'src/app/pages/quiz/quiz-overview/quiz-overview.component';



@NgModule({
  declarations: [
    QuizSolveComponent,
    MultiChoiceQuestionComponent,
    CompleteSentenceQuestionComponent,
    QuizResultComponent,
    QuizCreateComponent,
    QuizOverviewComponent
  ],
  imports: [
    AngularMaterialModule, // all angular material modules in one place for readability
    QuizRoutingModule,
    NgbModule,
    CommonModule,
    NgChartsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
  ]
})
export class QuizModule { }
