import { User } from './../../core/shared/models/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;
  loggedIn = false;
  premium = false;
  constructor(private router: Router,
    private alert: AlertService,
    private navService: NavbarService) { }

  ngOnInit() {

    const user = JSON.parse(window.localStorage.getItem('user'));
    console.log('navbar init');
    console.log(user);
    if (user) {
      this.navService.updateUser(user);
    }

    this.navService.getUser().subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    window.localStorage.clear();
    this.navService.updateUser(undefined);
    this.alert.info('You are now logged out.', 5000, true);
    this.router.navigate(['home']);
  }

}
