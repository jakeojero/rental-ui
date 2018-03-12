import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../core/shared/models/Property';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/RX';
import { environment } from '../../../environments/environment';

const url = environment.apiURL;

@Injectable()
export class EditpropertyService {
  private baseUrl = url;
  constructor(private httpClient: HttpClient) { }

  submitProperty(property: Property, user: string) {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    const obj = {
      user: user,
      property: property
    };

    console.log(obj);

    return this.httpClient.post('/api/properties', obj, { headers: headers });
  }

  updateProperty(property: Property, id: string) {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });
    return this.httpClient.put('/api/properties/' + id, property, { headers: headers });
  }
}
