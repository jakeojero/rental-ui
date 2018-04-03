import { Component, OnInit } from '@angular/core';
import { PremiumService } from '../premium.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../alert/alert.service';
import { SpinnerService } from '../../../spinner/spinner.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  openModal: boolean = false;
  properties = <any>[];
  selectedProperty;
  constructor(private premiumService: PremiumService,
              private router: Router,
              private alert: AlertService,
              private spinner: SpinnerService) { }

  ngOnInit() {
    this.spinner.spin();
    this.premiumService.getProperties().subscribe(
      response => {
        this.spinner.hide()
        this.properties = response;
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400) {
          this.alert.error('Your session has ended. Please Log in.', 7500, true);
          this.router.navigate(['login']);
        }
        this.spinner.hide();
        console.log(error);
      }
    )

  }

  openDetails(property) {
    this.selectedProperty = property;
    this.openModal = true;
  }

}
