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

}
