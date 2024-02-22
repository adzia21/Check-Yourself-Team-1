import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCreateComponent } from 'src/app/pages/quiz/quiz-create/quiz-create.component';
import { QuizSolveComponent } from 'src/app/pages/quiz/quiz-solve/quiz-solve.component';

const routes: Routes = [
  {
    path: '', component: QuizCreateComponent,
  },
  {
    path: ':id', component: QuizSolveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
