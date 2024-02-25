import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { quizUrl } from '../shared/constants/constants';
import { CreateQuiz } from '../shared/models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  private get managementController() {
    return 'quiz-management';
  }

  public creataQuiz(model: CreateQuiz): Observable<any> {
    return this.http
      .post<any>(`${quizUrl}/${this.managementController}`, model)
      .pipe(
        map((response: any) => {
          const user = response;
          // if (user) {
          //     this.setCurrentUser(user.methodResult);
          // }
          console.log(response);
          return response;
        })
      );
  }
}
