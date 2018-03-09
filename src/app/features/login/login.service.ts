import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { LoginUser } from '../../core/shared/models/LoginUser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/RX';

const url = '/';  // need URL

@Injectable()
export class LoginService {
  private baseUrl = ''; // URL to API
  constructor(private http: Http) { }

  // Post
  loginUser(user: LoginUser): Observable<LoginUser> {
    return this.http.post(this.baseUrl + '/login', user)
    .map(this.extractLoginrUser)
    .do(data => console.log(''))
    .catch(this.handleError);

    // Need to do things to return a token as an authenticated/authorized user?
  }

  extractLoginrUser(response: Response) {
    const body = response.json();
    return body.data || {};

    // This is generic, maybe need to be made more LoginUser specific?
  }

  handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw('Server Error');
  }


}
