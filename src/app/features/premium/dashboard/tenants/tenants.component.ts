import { Component, OnInit } from '@angular/core';
import { PremiumService } from '../premium.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  properties = <any>[];
  constructor(private premiumService: PremiumService) { }

  ngOnInit() {
    this.premiumService.getListOfProperties().subscribe(
      properties => {
        this.properties = properties;
      }
    )
  }

}
