import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    const token = window.localStorage.getItem('token');
    if (token) {
      return true;
    }

    this.router.navigate(['login']);
    return false;

  }

}
