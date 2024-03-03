import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { flowUrl, url } from '../shared/constants/constants';
import { UserResponse } from '../shared/models/register-login.model';
import { Company } from '../shared/models/company.model';
import { FullJobOffer, SimplifiedJobOffer } from '../shared/models/job-offer.model';

@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
  constructor(private http: HttpClient) {}

  private get controller() {
    return 'api/offers';
  }

  public getLoggedUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${url}/user/details/loggedUser`).pipe(
      map((response: UserResponse) => {
        return response;
      })
    );
  }

  public getCompanyJobOffers(): Observable<SimplifiedJobOffer[]> {
    return this.http
      .get<SimplifiedJobOffer[]>(`${flowUrl}/${this.controller}`)
      .pipe(
        map((response: SimplifiedJobOffer[]) => {
          return response;
        })
    );
  }

  public getCompanyOtherJobOffers(id: number): Observable<SimplifiedJobOffer[]> {
    return this.http
      .get<SimplifiedJobOffer[]>(`${flowUrl}/${this.controller}/company/${id}`)
      .pipe(
        map((response: SimplifiedJobOffer[]) => {
          return response;
        })
    );
  }

  public getJobOffer(id: number): Observable<FullJobOffer> {
    return this.http
      .get<FullJobOffer>(`${flowUrl}/${this.controller}/${id}`)
      .pipe(
        map((response: FullJobOffer) => {
          return response;
        })
    );
  }

  public editJobOffer(id: number, model: FullJobOffer): Observable<FullJobOffer> {
    return this.http
      .put<FullJobOffer>(`${flowUrl}/${this.controller}/${id}`, model)
      .pipe(
        map((response: FullJobOffer) => {
          return response;
        })
    );
  }

  public createJobOffer(model: FullJobOffer): Observable<FullJobOffer> {
    return this.http
      .post<FullJobOffer>(`${flowUrl}/${this.controller}`, model)
      .pipe(
        map((response: FullJobOffer) => {
          return response;
        })
    );
  }

}
