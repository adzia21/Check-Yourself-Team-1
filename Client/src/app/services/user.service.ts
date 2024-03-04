import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { flowUrl, url } from '../shared/constants/constants';
import {
  UserResponse,
} from '../shared/models/register-login.model';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private get controller() {
    return 'api/user-details';
  }

  public getLoggedUser(): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(`${url}/user/details/loggedUser`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public getUser(): Observable<User> {
    return this.http
      .get<User>(`${flowUrl}/${this.controller}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public saveUser(model: User): Observable<User> {
    return this.http
      .put<User>(`${flowUrl}/${this.controller}`, model)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
