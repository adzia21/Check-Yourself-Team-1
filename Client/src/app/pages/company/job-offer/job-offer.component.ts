import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { platforms, technologies, tools } from 'src/app/shared/constants/company-profile.constants';
import { icons } from 'src/app/shared/constants/constants';
import { FullJobOffer, SimplifiedJobOffer } from 'src/app/shared/models/job-offer.model';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss'],
})
export class JobOfferComponent implements OnInit {
  public image: string = `${icons}/logo_black.svg`;
  public facebook: string = `${icons}/facebook.svg`;
  public twitter: string = `${icons}/twitter.svg`;
  public instagram: string = `${icons}/instagram.svg`;
  public linkedin: string = `${icons}/linkedin.svg`;
  public icons = icons;
  public technologies = technologies;
  public tools = tools;
  public platforms = platforms;
  public isCompany = true;
  public offerID: number = 0;
  public companyID: number = 0;

  public data!: FullJobOffer;
  public jobOffers:  SimplifiedJobOffer[] = [];

  constructor(private jobOfferService: JobOfferService, private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyID = Number(this.route.snapshot.paramMap.get('id'));
    this.offerID = Number(this.route.snapshot.paramMap.get('offerId'));

    this.jobOfferService.getLoggedUser().subscribe(res => {
      this.isCompany = res.company;

      if (this.isCompany) {
        this.companyService.getCompany().subscribe(res => {
          this.jobOfferService.getCompanyJobOffers(res.id).subscribe(res => {
            this.jobOffers = res;
            this.jobOffers = this.jobOffers.filter(offer => offer.id !== this.offerID)
          });
        });
      }
    });

    this.jobOfferService.getJobOffer(this.offerID).subscribe(res => {
      this.data = res;
    });
    
  }

  public getTechnologyName(technology: string) {
    switch (technology) {
      case 'angular.svg':
        return 'Angular';
      case 'c.svg':
        return 'C';
      case 'cpp.svg':
        return 'C++';
      case 'csharp.svg':
        return 'C#';
      case 'python.svg':
        return 'Python';
      case 'java.svg':
        return 'Java';
      case 'html5.svg':
        return 'HTML5';
      case 'css3.svg':
        return 'CSS3';
      case 'javascript.svg':
        return 'JavaScript';
      case 'typescript.svg':
        return 'TypeScript';
      case 'androidstudio.svg':
        return 'Android Studio';
      case 'react.svg':
        return 'React';
      case 'unrealengine.svg':
        return 'Unreal Engine';
      case 'arduino.svg':
        return 'Arduino';
      default:
        return '';
    }
  }

  public getToolName(tool: string) {
    switch (tool) {
      case 'git.svg':
        return 'Git';
      case 'jira.svg':
        return 'Jira';
      case 'jenkins.svg':
        return 'Jenkins';
      default:
        return '';
    }
  }

  public getPlatformName(platform: string) {
    switch (platform) {
      case 'windows.svg':
        return 'Windows';
      case 'linux.svg':
        return 'Linux';
      default:
        return '';
    }
  }
}
