import { NavbarService } from './../../navbar/navbar.service';
import { AlertService } from './../../alert/alert.service';
import { SpinnerService } from './../../spinner/spinner.service';
import { Component, OnInit } from '@angular/core';
import { PremiumService } from './premium.service';
import { Property } from '../../../core/shared/models/Property';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';

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
    const properties = this.premiumService.getProperties();
    const expenses = this.premiumService.getExpenses();
    const tenants = this.premiumService.getTenants();

    forkJoin([properties, expenses, tenants]).subscribe(
      results => {
        this.spinner.hide();
        this.premiumService.getPropertiesSubject().next(<Property[]>results[0]);
        this.premiumService.getExpensesSubject().next(results[1]);
        this.premiumService.getTenantsSubject().next(results[2]);
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
      } else {
        this.alert.error('There was an error retrieving details on your account. Please Try again.', 5000, true);
      }
  }

}
