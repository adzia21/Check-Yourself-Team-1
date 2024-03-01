import { Component } from '@angular/core';
import { platforms, technologies, tools } from 'src/app/shared/constants/company-profile.constants';
import { icons } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent {
  public image: string = `${icons}/logo_black.svg`;
  public facebook: string = `${icons}/facebook.svg`;
  public twitter: string = `${icons}/twitter.svg`;
  public instagram: string = `${icons}/instagram.svg`;
  public linkedin: string = `${icons}/linkedin.svg`;
  public icons = icons;
  public technologies = technologies;
  public tools = tools;
  public platforms = platforms;

  constructor() {}
}
