import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { url } from '../shared/constants/constants';
import {
    LoginUser,
  LoginUserResponse,
  RegisterUser,
  UserResponse,
} from '../shared/models/register-login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private get controller() {
    return 'auth';
  }

  public registerUser(model: RegisterUser): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${url}/${this.controller}/register`, model)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public loginUser(model: LoginUser): Observable<LoginUserResponse> {
    return this.http
      .post<LoginUserResponse>(`${url}/${this.controller}/login`, model)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
