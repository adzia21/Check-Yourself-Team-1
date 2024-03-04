import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router, private helperService: HelperService) {}

    canActivate() {
      if (localStorage.getItem('token') && localStorage.getItem('token') != "undefined") {
        
        return true;
      }

      this.helperService.logoutUser();
      this.router.navigate(['']);
      return false;
    }
}