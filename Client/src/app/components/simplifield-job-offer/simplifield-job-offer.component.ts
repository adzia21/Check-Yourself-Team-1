import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { icons } from 'src/app/shared/constants/constants';
import { SimplifiedJobOffer } from 'src/app/shared/models/job-offer.model';

@Component({
  selector: 'app-simplifield-job-offer',
  templateUrl: './simplifield-job-offer.component.html',
  styleUrls: ['./simplifield-job-offer.component.scss'],
})
export class SimplifieldJobOfferComponent implements OnInit {
  @Input() jobOffers: SimplifiedJobOffer[] = [];
  @Input() isPorfile: boolean = false;
  @Input() companyId: number = 0;

  public image: string = `${icons}/logo_black.svg`;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  public show(index: number) {
    return this.jobOffers[index].title != '';
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

  public apply(index: number) {
    this.router.navigate([`company/${this.companyId}/job-offer/${this.jobOffers[index].id}`]);
  }
}
