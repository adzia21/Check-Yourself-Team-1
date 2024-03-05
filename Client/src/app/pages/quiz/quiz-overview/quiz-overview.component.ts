import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { CompanyQuizView, UserQuizView } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.scss'],
})
export class QuizOverviewComponent implements OnInit {
  public userQuizes: UserQuizView[] = [];
  public companyQuizes: CompanyQuizView[] = [];
  public isCompany: boolean = false;
  public x = ['', '', '', '', '']

  constructor(private quizService: QuizService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(res => {
      this.isCompany = res.company;

        this.quizService.getAllUserQuizes().subscribe((res: UserQuizView[]) => {
          this.userQuizes = res;
        });

        this.quizService.getAllCompanyQuizes().subscribe((res: CompanyQuizView[]) => {
          this.companyQuizes = res;
        });
    })
    
  }

  public add() {
    this.router.navigate(['quiz'])
  }

  public goToQuiz(id: number) {
    this.router.navigate([`quiz/${id}`])
  }
}
