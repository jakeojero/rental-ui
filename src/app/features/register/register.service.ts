import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { RegisterUser } from '../../core/shared/models/RegisterUser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/RX';
import { environment } from '../../../environments/environment';

const url = environment.apiURL;

@Injectable()
export class RegisterService {
  private baseUrl = url;

  constructor(private http: Http) { }

  // Post
  registerUser(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post(this.baseUrl + 'auth/register', user)
      .map(this.extractRegisterUser)
      .do(data => console.log(''))
      .catch(this.handleError);
  }

  extractRegisterUser(response: Response) {
    const body = response.json();
    return body.data || {};
  }

  handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw('Server Error');
  }
}
