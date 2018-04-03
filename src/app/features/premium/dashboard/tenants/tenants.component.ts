import { Component, OnInit, Inject } from '@angular/core';
import { PremiumService } from '../premium.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../../alert/alert.service';
import { SpinnerService } from '../../../spinner/spinner.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  properties = <any>[];
  tenants = <any>[];
  tenantForm: FormGroup;

  constructor(private premiumService: PremiumService,
              @Inject(FormBuilder) fb: FormBuilder,
              private alert: AlertService,
              private spinner: SpinnerService) { 

               this.tenantForm = fb.group({
                  firstname: ['', Validators.required],
                  lastname: ['', Validators.required],
                  property: ['', Validators.required]
               });
  }

  ngOnInit() {
    this.spinner.spin();
    this.premiumService.getListOfProperties().subscribe(
      properties => {
        this.properties = properties;
      }
    );
    
    this.premiumService.getTenants().subscribe(
      (response: Array<any>) => {
        this.spinner.hide();
        this.tenants = [...response];

      },
      err => {
        this.alert.error('There was an error retrieving tenants', 5000, true);
      }
    )
  }

  saveTenant() {
    this.spinner.spin();
    this.premiumService.saveTenant(this.tenantForm.value).subscribe(
      response => {
        this.spinner.hide();
        this.tenants.push(response);
        this.tenantForm.reset();
      },
      err => {
        this.spinner.hide();
        this.alert.error('There was an error saving that tenant! Please try again.', 5000, false);
      }
    )
  }

  deleteTenant(tenant) {
    this.spinner.spin();
    this.premiumService.deleteTenant(tenant.id).subscribe(
      response => {
        this.spinner.hide();
        this.alert.info(`Deleted ${tenant.firstname}`, 5000, true);
        this.tenants.splice(this.tenants.indexOf(tenant), 1);
      },
      error => {
        this.spinner.hide();
        this.alert.error(`Error Deleting ${tenant.firstname}`, 5000, true);
      }
    )
  }

}
