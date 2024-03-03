import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'main-page', component: MainPageComponent,
  },
  {
    path: 'quiz', loadChildren: () => import('./modules/quiz-module/quiz.module').then(module => module.QuizModule),
  },
  {
    path: 'user', loadChildren: () => import('./modules/user-module/user.module').then(module => module.UserModule),
  },
  {
    path: 'company', loadChildren: () => import('./modules/company-module/company.module').then(module => module.CompanyModule),
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
