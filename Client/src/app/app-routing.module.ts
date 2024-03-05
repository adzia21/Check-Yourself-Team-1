import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { RedirectLoggedGuard } from './helpers/guards/redirect-logged.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate:[RedirectLoggedGuard]
  },
  {
    path: 'main-page', component: MainPageComponent, canActivate:[AuthGuard]
  },
  {
    path: 'quiz', loadChildren: () => import('./modules/quiz-module/quiz.module').then(module => module.QuizModule), canActivate:[AuthGuard]
  },
  {
    path: 'user', loadChildren: () => import('./modules/user-module/user.module').then(module => module.UserModule), canActivate:[AuthGuard]
  },
  {
    path: 'company', loadChildren: () => import('./modules/company-module/company.module').then(module => module.CompanyModule), canActivate:[AuthGuard]
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
