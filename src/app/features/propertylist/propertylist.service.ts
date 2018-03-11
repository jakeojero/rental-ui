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
export class PropertylistService {

  private baseUrl = url;

  constructor(private httpClient: HttpClient) { }


  getProperties() {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.httpClient.get(`/api/properties`, { observe: 'response', headers: headers });
    // Check on this
  }
  getFilteredProperties(filter: string, term: string) {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.httpClient.get(`/api/properties`, { observe: 'response', headers: headers });
    // Check on this
  }
}
