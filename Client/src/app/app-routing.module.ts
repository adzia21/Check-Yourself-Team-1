import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'quiz', loadChildren: () => import('./modules/quiz-module/quiz.module').then(module => module.QuizModule),
  },
  {
    path: 'user', loadChildren: () => import('./modules/user-module/user.module').then(module => module.UserModule),
  },
  {
    path: '**', redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
