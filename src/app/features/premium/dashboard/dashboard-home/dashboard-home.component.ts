import { Component, OnInit } from '@angular/core';
import { PremiumService } from '../premium.service';
import { Property } from '../../../../core/shared/models/Property';
import { SpinnerService } from '../../../spinner/spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../alert/alert.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../../navbar/navbar.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor(private premiumService: PremiumService,
              private spinner: SpinnerService,
              private alert: AlertService,
              private router: Router,
              private navbar: NavbarService) { }

  ngOnInit() {
    this.spinner.spin();
    this.premiumService.getProperties().subscribe(
    (properties: Property[]) => {
      this.premiumService.getPropertiesSubject().next(properties);
      this.spinner.hide();
    },
    (error: HttpErrorResponse) => {
      this.spinner.hide();
      if(error.status === 401) {
        this.alert.error('Your session has ended. Please Log in.', 7500, true);
        this.navbar.sessionEnded();
        this.router.navigate(['login']);
      }
    })
    
  }

}
