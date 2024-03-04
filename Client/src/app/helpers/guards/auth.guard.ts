import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private router: Router) {}

    canActivate() {
      if (localStorage.getItem('token') || localStorage.getItem('token') != "undefined") {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    }
}