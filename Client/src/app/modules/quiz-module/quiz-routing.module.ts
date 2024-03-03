import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCreateComponent } from 'src/app/pages/quiz/quiz-create/quiz-create.component';
import { QuizOverviewComponent } from 'src/app/pages/quiz/quiz-overview/quiz-overview.component';
import { QuizSolveComponent } from 'src/app/pages/quiz/quiz-solve/quiz-solve.component';

const routes: Routes = [
  {
    path: '', component: QuizCreateComponent,
  },
  {
    path: ':id', component: QuizSolveComponent,
  },
  {
    path: ':userId/quiz-overview', component: QuizOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
