import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../../core/shared/models/RegisterUser';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';

const url = environment.apiURL;

@Injectable()
export class RegisterService {
  private baseUrl = url;

  constructor(private httpClient: HttpClient) { }

  // Post
  registerUser(user: RegisterUser) {
    return this.httpClient.post('/api/auth/register', user);
  }

}
