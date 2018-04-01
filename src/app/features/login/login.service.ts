import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser } from '../../core/shared/models/LoginUser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';
import { environment } from '../../../environments/environment';

const url = environment.apiURL;

@Injectable()
export class LoginService {
  private baseUrl = url;
  constructor(private httpClient: HttpClient) { }

  loginUser(user: LoginUser) {
    const base64Credentials = btoa(`${user.username}:${user.password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${base64Credentials}`
    });

    return this.httpClient.get(`/api/auth/login`, {observe: 'response', headers: headers});

  }

  logout() {}


}
