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
import { environment } from '../../../environments/environment';

const url = environment.apiURL;

@Injectable()
export class LoginService {
  private baseUrl = url;
  constructor(private http: Http) { }

  loginUser(user: LoginUser): Observable<LoginUser> {
    const myHeaders = new Headers();
    // let myParams = new URLSearchParams();
    const base64Credentials = btoa(`${user.username}:${user.password}`);
    myHeaders.append('Authorization', `Basic ${base64Credentials}`);
    const options = new RequestOptions({headers: myHeaders });

    return this.http.get(this.baseUrl + 'auth/login')
      .map(this.extractLoginUser)
      .do(data => console.log(''))
      .catch(this.handleError);

    // Need to do things to return a token as an authenticated/authorized user?
  }

  extractLoginUser(response: Response) {
    if (response.ok) {
      const token = response.headers.get('X-Auth-Token');
      window.localStorage.setItem('token', token);
    } else {
      // this.handleError();
    }
  }

  handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw('Server Error');
  }


}
