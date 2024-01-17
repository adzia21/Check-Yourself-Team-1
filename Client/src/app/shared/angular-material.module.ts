import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule
  ],
})
export class AngularMaterialModule {}