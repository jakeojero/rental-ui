import { User } from './../../core/shared/models/User';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavbarService {

  private user = new BehaviorSubject<User>(undefined);

  constructor() { }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  updateUser(user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  addPremiumToUser(prem: boolean) {
    const u = this.user.getValue();
    u.premium = prem;
    window.localStorage.setItem('user', JSON.stringify(u));
    this.user.next(u);
  }
}
