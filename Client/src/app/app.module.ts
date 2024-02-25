import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageWraperComponent } from './components/landing-page-wraper/landing-page-wraper.component';
import { QuizModule } from './modules/quiz-module/quiz.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginDialogComponent } from './components/dialog/login-dialog/login-dialog.component';
import { UserModule } from './modules/user-module/user.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './helpers/interceptors/bearer.interceprot';
import { RegisterFormComponent } from './components/dialog/register-form/register-form.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageWraperComponent,
    LoginDialogComponent,
    RegisterFormComponent
  ],
  imports: [
    AngularMaterialModule, // all angular material modules in one place for readability
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    QuizModule,
    UserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
