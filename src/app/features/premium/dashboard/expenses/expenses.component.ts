import { Component, OnInit } from '@angular/core';
import { PremiumService } from '../premium.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  properties = [];
  constructor(private premiumService: PremiumService) { 

  }

  ngOnInit() {
    this.premiumService.getListOfProperties().subscribe(
      properties => {
        this.properties = properties;
      }
    )
  }

}
