import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { flowUrl, url } from '../shared/constants/constants';
import {
  UserResponse,
} from '../shared/models/register-login.model';
import { Company } from '../shared/models/company.model';
import { SimplifiedJobOffer } from '../shared/models/job-offer.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  private get controller() {
    return 'api/company-details';
  }

  public getLoggedCompany(): Observable<UserResponse> {
    return this.http
      .get<UserResponse>(`${url}/user/details/loggedUser`)
      .pipe(
        map((response: UserResponse) => {
          return response;
        })
      );
  }

  public getCompany(): Observable<Company> {
    return this.http
      .get<Company>(`${flowUrl}/${this.controller}`)
      .pipe(
        map((response: Company) => {
          return response;
        })
      );
  }

  public editCompany(model: Company): Observable<Company> {
    return this.http
      .put<Company>(`${flowUrl}/${this.controller}`, model)
      .pipe(
        map((response: Company) => {
          return response;
        })
      );
  }

  public getAllCompany(): Observable<Company> {
    return this.http
      .get<Company>(`${flowUrl}/${this.controller}/all`)
      .pipe(
        map((response: Company) => {
          return response;
        })
      );
  }

  public getCompanyByID(id: number): Observable<Company> {
    return this.http
      .get<Company>(`${flowUrl}/${this.controller}/${id}`)
      .pipe(
        map((response: Company) => {
          return response;
        })
      );
  }
}
