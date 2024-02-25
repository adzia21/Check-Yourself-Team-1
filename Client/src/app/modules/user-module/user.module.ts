import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from 'src/app/pages/user/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from 'src/app/pages/user/user-edit/user-edit.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/helpers/interceptors/bearer.interceprot';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserEditComponent
  ],
  imports: [
    AngularMaterialModule, // all angular material modules in one place for readability
    UserRoutingModule,
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
export class UserModule { }
