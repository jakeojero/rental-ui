import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavbarService {

  private isLoggedIn = new Subject<boolean>();
  constructor() { }

  getLoggedStatus(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }

  updateLoggedInStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }
}
