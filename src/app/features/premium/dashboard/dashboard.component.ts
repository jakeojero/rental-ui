import { Component, OnInit } from '@angular/core';
import { PremiumService } from './premium.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  collapsable = true;

  constructor(private premiumService: PremiumService) { }

  ngOnInit() {}

}
