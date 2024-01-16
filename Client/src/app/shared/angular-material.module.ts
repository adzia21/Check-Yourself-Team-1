import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
})
export class AngularMaterialModule {}