import { Injectable } from '@angular/core';
import { Alert, AlertType } from './alert';
import { Subject } from 'rxjs/Subject';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          console.log('route changed');
          this.keepAfterRouteChange = false;
        } else {
          console.log('clearing');
          this.clear();
        }
      }
    });

  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  error(message: string, timeout?: number, keepAfterRouteChange = false) {
    this.alert('Error!', AlertType.error, message, keepAfterRouteChange, timeout);
  }

  info(message: string, timeout?: number, keepAfterRouteChange = false) {
    this.alert('Info!', AlertType.info, message, keepAfterRouteChange, timeout);
  }

  warn(message: string, timeout?: number, keepAfterRouteChange = false) {
    this.alert('Warning!', AlertType.warning, message, keepAfterRouteChange, timeout);
  }

  alert(label: string, type: AlertType, message: string, keepAfterRouteChange = false, timeout?: number) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ label: label, type: type, message: message, timeout: timeout });
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
