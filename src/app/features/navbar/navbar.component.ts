import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: string;
  loggedIn = false;
  constructor(private router: Router,
    private alert: AlertService) { }

  ngOnInit() {
    this.user = window.localStorage.getItem('username');
    if (this.user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  logout() {
    window.localStorage.setItem('token', '');
    window.localStorage.setItem('username', '');
    window.localStorage.setItem('email', '');
    this.loggedIn = false;
    this.alert.info('You are now logged out.', 5000, true);
    this.router.navigate(['home']);
  }

}
