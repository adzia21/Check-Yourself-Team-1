import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';


@Injectable({ providedIn: 'root' })
export class RedirectLoggedGuard {
    constructor(private router: Router, private helperService: HelperService) {}

    canActivate() {
      if (localStorage.getItem('token') && localStorage.getItem('token') != "undefined") {
        this.router.navigate(['main-page']);
        return false;
      }
      return true;
    }
}