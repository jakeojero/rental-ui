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

    const userStorage = window.localStorage.getItem('user');
    const user = userStorage !== 'undefined' ? JSON.parse(userStorage) : undefined;

    if (user !== undefined) {
      this.navService.updateUser(user);
    }

    this.navService.getUser().subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    this.navService.logout();
  }

}
