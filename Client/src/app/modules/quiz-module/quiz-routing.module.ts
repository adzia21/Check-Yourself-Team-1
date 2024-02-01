import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizSolveComponent } from 'src/app/pages/quiz/quiz-solve/quiz-solve.component';

const routes: Routes = [
  {
    path: '', component: QuizSolveComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
