import { CanActivate, Router } from '@angular/router';
import { NavbarService } from '../../../features/navbar/navbar.service';
import { User } from '../models/User';
import { AlertService } from '../../../features/alert/alert.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PremiumGuard implements CanActivate {

  user: User;
  constructor(private navbar: NavbarService, private alert: AlertService, private router: Router) {
    this.navbar.getUser().subscribe(user => {
      this.user = user;
    });
  }

  canActivate() {

    if (this.user) {
      if (this.user.isPremium) {
        return true;
      } else {
        this.alert.error('You must be a premium user to view that page', 5000, true);
        this.router.navigate(['premium-signup']);
      }
    }

    this.alert.error('You must be logged in and a premium user to view that page.', 5000, true);
    this.router.navigate(['login']);

  }
}
