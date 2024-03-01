import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditComponent } from 'src/app/pages/company/company-edit/company-edit.component';
import { CompanyProfileComponent } from 'src/app/pages/company/company-profile/company-profile.component';

const routes: Routes = [
  {
    path: ':id', component: CompanyProfileComponent,
  },
  {
    path: ':id/edit', component: CompanyEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
