import { Component, Input } from "@angular/core"
import { icons } from "src/app/shared/constants/constants";
import { SimplifiedJobOffer } from "src/app/shared/models/job-offer.model";

@Component({
  selector: 'app-simplifield-job-offer',
  templateUrl: './simplifield-job-offer.component.html',
  styleUrls: ['./simplifield-job-offer.component.scss']
})
export class SimplifieldJobOfferComponent {
    @Input() jobOffers: SimplifiedJobOffer[] = [];

    public image: string = `${icons}/logo_black.svg`;

}