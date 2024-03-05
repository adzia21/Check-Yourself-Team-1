import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { SimplifiedJobOffer } from 'src/app/shared/models/job-offer.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public jobOffers: SimplifiedJobOffer[] = [];
  public arrdum = [];

  constructor(
    private offerService: JobOfferService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerService.getAllJobOffer().subscribe((res) => {
      // let len = res.length;
      // let val1, val2, val3;
      // if (res.length > 5) {
      //   val1 = res[Math.floor(len * Math.random())];
      //   do {
      //     val2 = res[Math.floor(len * Math.random())];
      //   } while (res.indexOf(val1) === res.indexOf(val2));
      //   do {
      //     val3 = res[Math.floor(len * Math.random())];
      //   } while (
      //     res.indexOf(val1) === res.indexOf(val3) ||
      //     res.indexOf(val2) === res.indexOf(val3)
      //   );
      //   let arr = [val1, val2, val3];
      //   this.jobOffers = arr;
      // } else {
        this.jobOffers = res;
      // }
    });
  }

  public goToQuiz() {
    //this.router.navigate([`quiz/id`]);
  }
}
