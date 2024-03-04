import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from 'src/app/pages/user/user-edit/user-edit.component';
import { UserProfileComponent } from 'src/app/pages/user/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: ':id', component: UserProfileComponent,
  },
  {
    path: ':id/edit', component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
