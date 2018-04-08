import { NavbarService } from './../../navbar/navbar.service';
import { AlertService } from './../../alert/alert.service';
import { SpinnerService } from './../../spinner/spinner.service';
import { Component, OnInit } from '@angular/core';
import { PremiumService } from './premium.service';
import { Property } from '../../../core/shared/models/Property';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  collapsable = true;

  constructor(private premiumService: PremiumService,
              private spinner: SpinnerService,
              private alert: AlertService,
              private navbar: NavbarService,
              private router: Router) { }

  ngOnInit() {
    this.spinner.spin();
    this.premiumService.getProperties().subscribe(
      response => {
        this.spinner.hide();
        console.log('props:');
        console.log(response);
        this.premiumService.getPropertiesSubject().next(<Property[]>response);
      },
      err => this.authFailed(err)
    );

    this.premiumService.getExpenses().subscribe(
      response => {
        this.spinner.hide();
        console.log('expenses:');
        console.log(response);
        this.premiumService.getExpensesSubject().next(response);
      },
      err => this.authFailed(err)
    );

    this.premiumService.getTenants().subscribe(
      response => {
        this.spinner.hide();
        console.log('tenants:');
        console.log(response);
        this.premiumService.getTenantsSubject().next(response);
      },
      err => this.authFailed(err)
    );

  }

  authFailed(error: HttpErrorResponse) {
      this.spinner.hide();
      if (error.status === 401) {
        this.alert.error('Your session has ended. Please Log in.', 7500, true);
        this.navbar.sessionEnded();
        this.router.navigate(['login']);
      }
  }

}
