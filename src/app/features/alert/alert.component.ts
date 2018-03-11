import { Component, OnInit } from '@angular/core';
import {Alert} from './alert';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {

  }

  ngOnInit() {
    this.alertService.getAlert().subscribe( (alert: Alert) => {

      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }

      // add alert to array
      this.alerts.push(alert);

      // Remove Alert after specified time
      if (alert.timeout) {
        setTimeout( () => {
          this.removeAlert(alert);
        }, alert.timeout);
      }

    });

  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

}
