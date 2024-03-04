import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private isLoggedIn: boolean = false;
  constructor() {}

  public logoutUser() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }
  
  public isLoggedUser() {
    return this.isLoggedIn;
  }
}
