import { Component, OnInit } from '@angular/core';
import { PremiumService } from '../premium.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../../../alert/alert.service';
import { SpinnerService } from '../../../spinner/spinner.service';
import { Property } from '../../../../core/shared/models/Property';
import { EditpropertyService } from '../../../editproperty/editproperty.service';
import { User } from '../../../../core/shared/models/User';
import { NavbarService } from '../../../navbar/navbar.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  user: User;
  openModal = false;
  properties = <any>[];
  selectedProperty;
  constructor(private premiumService: PremiumService,
    private router: Router,
    private alert: AlertService,
    private spinner: SpinnerService,
    private propertyService: EditpropertyService,
    private navbar: NavbarService) {
    this.navbar.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.premiumService.getListOfProperties().subscribe(
      properties => {
        this.properties = properties;
      }
    );

  }

  openDetails(property) {
    this.selectedProperty = property;
    this.openModal = true;
  }

  onUpdate(event) {
    console.log(event);
  }

  promoteProperty(property: Property) {
    this.spinner.spin();
    property.isPromoted = true;
    this.propertyService.updateProperty(property, this.user.id).subscribe(resp => this.onComplete(resp),
    err => {
      this.spinner.hide();
      if (err.error.message) {
        this.alert.error(err.error.message, 5000, false);
      } else {
        this.alert.error('An error occured', 5000, false);
      }
    });
  }

  onComplete(res) {
    this.spinner.hide();
    this.alert.info(res.outcome.sellerMessage, 5000, true);
    this.router.navigate(['/home']);
  }
}
