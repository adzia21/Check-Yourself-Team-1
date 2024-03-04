import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public isCompany: boolean = false;
  public id: number = 0;
  public isCompanysProfile: boolean = false;

  constructor(private companyService: CompanyService, private jobOfferService: JobOfferService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.companyService.getLoggedCompany().subscribe(res => {
      this.isCompany = res.company
      
      this.isCompanysProfile = res.id === Number(this.route.snapshot.paramMap.get('id'))

      if(this.isCompany) {
        this.companyService.getCompany().subscribe(res => {
          this.id = res.id
          this.data = res;

          this.jobOfferService.getCompanyJobOffers(this.id).subscribe(res => {
            this.jobOffers = res;
          });
        });
      }
    });
  }
}
