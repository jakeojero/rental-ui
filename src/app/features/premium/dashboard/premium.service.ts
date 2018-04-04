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

  }

  getProperties() {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.http.get(`/api/premium/properties?username=${this.user.username}`, {headers: headers});
  }

  getTenants() {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.http.get(`/api/tenants/user/${this.user.id}`, {headers: headers});
  }

  saveTenant(tenant) {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    tenant.user = this.user;
    tenant.rent = +tenant.rent;
    return this.http.post(`/api/tenants/save`, tenant, {headers: headers});
  }

  deleteTenant(id) {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.http.delete(`/api/tenants/${id}`, {headers: headers});
  }

  getExpenses() {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.http.get(`/api/expenses/user/${this.user.id}`, {headers: headers});
  }

  saveExpense(expense) {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });
    expense.user = this.user;
    return this.http.post(`/api/expenses/save`, expense, {headers: headers});
  }

  getPropertiesSubject() {
    return this.properties;
  }

  getListOfProperties() {
    return this.properties.asObservable();
  }
  
}
