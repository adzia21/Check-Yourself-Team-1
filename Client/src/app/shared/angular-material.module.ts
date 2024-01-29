import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatIconModule
  ],
})
export class AngularMaterialModule {}