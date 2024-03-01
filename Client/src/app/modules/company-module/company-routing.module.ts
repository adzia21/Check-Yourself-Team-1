import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditComponent } from 'src/app/pages/company/company-edit/company-edit.component';
import { CompanyProfileComponent } from 'src/app/pages/company/company-profile/company-profile.component';
import { JobOfferEditComponent } from 'src/app/pages/company/job-offer-edit/job-offer-edit.component';
import { JobOfferComponent } from 'src/app/pages/company/job-offer/job-offer.component';

const routes: Routes = [
  {
    path: ':id', component: CompanyProfileComponent,
  },
  {
    path: ':id/edit', component: CompanyEditComponent,
  },
  {
    path: ':id/job-offer/:offerId', component: JobOfferComponent,
  },
  {
    path: ':id/job-offer/:offerId/edit', component: JobOfferEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
