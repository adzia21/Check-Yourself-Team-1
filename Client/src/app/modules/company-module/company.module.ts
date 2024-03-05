import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/helpers/interceptors/bearer.interceprot';
import { ToastrModule } from 'ngx-toastr';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyProfileComponent } from 'src/app/pages/company/company-profile/company-profile.component';
import { CompanyEditComponent } from 'src/app/pages/company/company-edit/company-edit.component';
import { JobOfferComponent } from 'src/app/pages/company/job-offer/job-offer.component';
import { JobOfferEditComponent } from 'src/app/pages/company/job-offer-edit/job-offer-edit.component';
import { SimplifieldJobOfferComponent } from 'src/app/components/simplifield-job-offer/simplifield-job-offer.component';



@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompanyEditComponent,
    JobOfferComponent,
    JobOfferEditComponent,
    SimplifieldJobOfferComponent
  ],
  imports: [
    AngularMaterialModule, // all angular material modules in one place for readability
    CompanyRoutingModule,
    NgbModule,
    CommonModule,
    NgChartsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    SimplifieldJobOfferComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    },
  ]
})
export class CompanyModule { }
