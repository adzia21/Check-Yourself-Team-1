import { Component, Input, Output } from '@angular/core';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-landing-page-wraper',
  templateUrl: './landing-page-wraper.component.html',
  styleUrls: ['./landing-page-wraper.component.scss'],
})
export class LandingPageWraperComponent {
  public showRegisterForm: boolean = false;

  public vectorIcon: string = `${icons}/landing-page-vector.svg`;

  constructor() {}
}
