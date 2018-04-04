import { AlertService } from './../alert/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './../../core/shared/models/User';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
export class NavbarService {

  private user = new BehaviorSubject<User>(undefined);

  constructor(private http: HttpClient,
              private alert: AlertService,
              private router: Router) { }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  updateUser(user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  addPremiumToUser(prem: boolean) {
    const u = this.user.getValue();
    u.isPremium = prem;
    u.roles.push('ROLE_LANDLORD');
    window.localStorage.setItem('user', JSON.stringify(u));

    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`,
    });

    this.http.post('/payment/save', u, {observe: 'response', headers: headers}).subscribe(
       res => { console.log(res);},
       err => {this.alert.error('Error adding premium to user. Please contact us to add it manually', 10000, true);
    });
    this.user.next(u);
  }

  
  logout() {
    window.localStorage.clear();
    this.updateUser(undefined);
    this.alert.info('You are now logged out.', 5000, true);
    this.router.navigate(['home']);
  }

  sessionEnded() {
    window.localStorage.clear();
    this.updateUser(undefined);
  }
}
