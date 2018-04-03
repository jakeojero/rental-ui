import { Injectable } from '@angular/core';
import { NavbarService } from '../../navbar/navbar.service';
import { User } from '../../../core/shared/models/User';
import { PropertylistService } from '../../propertylist/propertylist.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SpinnerService } from '../../spinner/spinner.service';
import { AlertService } from '../../alert/alert.service';
import { Router } from '@angular/router';

import { Property } from '../../../core/shared/models/Property';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PremiumService {

  user: User;
  properties = new BehaviorSubject<Property[]>([]);
  constructor(private navbar: NavbarService, private http: HttpClient, private spinner: SpinnerService, private alert: AlertService, private router: Router) {
    this.spinner.spin();
    this.navbar.getUser().subscribe(user => {
      this.user = user;
    });

    this.getProperties().subscribe((properties: Property[]) => {
      this.properties.next(properties);
      this.spinner.hide();
    },
    (error: HttpErrorResponse) => {
      if(error.status === 400) {
        this.alert.error('Your session has ended. Please Log in.', 7500, true);
        this.router.navigate(['login']);
      }
      this.spinner.hide();
    })

  }

  getProperties() {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.http.get(`/api/premium/properties?username=${this.user.username}`, {headers: headers});
  }

  getListOfProperties() {
    return this.properties.asObservable();
  }

  
}
