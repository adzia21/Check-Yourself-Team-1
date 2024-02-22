import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { url } from '../shared/constants/constants';
import {
    LoginUser,
  LoginUserResponse,
  RegisterUser,
  RegisterUserResponse,
} from '../shared/models/register-login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private get controller() {
    return 'auth';
  }

  public registerUser(model: RegisterUser): Observable<RegisterUserResponse> {
    return this.http
      .post<RegisterUserResponse>(`${url}/${this.controller}/register`, model)
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

  public loginUser(model: LoginUser): Observable<LoginUserResponse> {
    return this.http
      .post<LoginUserResponse>(`${url}/${this.controller}/login`, model)
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
