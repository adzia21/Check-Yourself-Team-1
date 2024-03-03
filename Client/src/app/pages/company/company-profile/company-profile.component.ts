import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { platforms, technologies, tools } from 'src/app/shared/constants/company-profile.constants';
import { icons } from 'src/app/shared/constants/constants';
import { Company } from 'src/app/shared/models/company.model';
import { SimplifiedJobOffer } from 'src/app/shared/models/job-offer.model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  public image: string = `${icons}/logo_black.svg`;
  public facebook: string = `${icons}/facebook.svg`;
  public twitter: string = `${icons}/twitter.svg`;
  public instagram: string = `${icons}/instagram.svg`;
  public linkedin: string = `${icons}/linkedin.svg`;
  public icons = icons;
  public technologies = technologies;
  public tools = tools;
  public platforms = platforms;

  public data!: Company;
  public jobOffers: SimplifiedJobOffer[] = [];

  constructor(private companyService: CompanyService, private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.companyService.getCompany().subscribe(res => {
      console.log(res)
      this.data = res;
    });

    this.jobOfferService.getCompanyJobOffers().subscribe(res => {
      console.log(res)
      this.jobOffers = res;
    });
  }
}
