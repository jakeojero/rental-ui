import { Observable } from 'rxjs/Observable';
import { Alert } from './../alert/alert';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {

  private Subject = new Subject<boolean>();

  constructor() { }

  getSpinner(): Observable<any> {
    return this.Subject.asObservable();
  }

  spin() {
    this.Subject.next(true);
  }

  hide() {
    this.Subject.next(false);
  }
}
