import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { quizUrl } from '../shared/constants/constants';
import { CompanyQuizView, CreateQuiz, CreateQuizResponse, QuizResolve, QuizResult, QuizSolve, UserQuizView } from '../shared/models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  private get managementController() {
    return 'quiz';
  }

  private get resolveController() {
    return 'resolve';
  }

  public creataQuiz(model: CreateQuiz): Observable<CreateQuizResponse> {
    return this.http
      .post<CreateQuizResponse>(`${quizUrl}/${this.managementController}`, model)
      .pipe(
        map((response: CreateQuizResponse) => {
          return response;
        })
      );
  }

  public getQuiz(id: number): Observable<QuizSolve> {
    return this.http
      .get<QuizSolve>(`${quizUrl}/${this.managementController}/${id}`)
      .pipe(
        map((response: QuizSolve) => {
          return response;
        })
      );
  }

  public resolveQuiz(id: number, model: QuizResolve[]): Observable<QuizResult> {
    return this.http
      .post<QuizResult>(`${quizUrl}/${this.resolveController}/${id}`, model)
      .pipe(
        map((response: QuizResult) => {
          return response;
        })
      );
  }  

  public getAllUserQuizes(): Observable<UserQuizView[]> {
    return this.http
      .get<UserQuizView[]>(`${quizUrl}/${this.managementController}/get-all`)
      .pipe(
        map((response: UserQuizView[]) => {
          return response;
        })
      );
  }

  public getAllCompanyQuizes(): Observable<CompanyQuizView[]> {
    return this.http
      .get<CompanyQuizView[]>(`${quizUrl}/${this.resolveController}/get-all`)
      .pipe(
        map((response: CompanyQuizView[]) => {
          return response;
        })
      );
  }
}
