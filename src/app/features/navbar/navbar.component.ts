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

  user: string;
  loggedIn = false;
  constructor(private router: Router,
    private alert: AlertService,
    private navService: NavbarService) { }

  ngOnInit() {
    this.user = window.localStorage.getItem('username');
    this.navService.getLoggedStatus().subscribe(loggedIn => {
      this.user = window.localStorage.getItem('username');
      this.loggedIn = loggedIn;
    });
  }

  logout() {
    window.localStorage.clear();
    this.navService.updateLoggedInStatus(false);
    this.alert.info('You are now logged out.', 5000, true);
    this.router.navigate(['home']);
  }

}
