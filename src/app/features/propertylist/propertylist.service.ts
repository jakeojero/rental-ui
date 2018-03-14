import {Injectable, NgZone} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Property } from '../../core/shared/models/Property';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/RX';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/mergeMap';
import { environment } from '../../../environments/environment';

const url = environment.apiURL;
declare var EventSource;

@Injectable()
export class PropertylistService {

  private baseUrl = url;

  constructor(private httpClient: HttpClient, private zone: NgZone) { }

  getProperties() {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.httpClient.get(`/api/properties`, { observe: 'response', headers: headers });
    // Check on this
  }

  observeMessages(sseUrl: string) {

    return new Observable<string>(obs => {
      const es = new EventSource(sseUrl);
      es.addEventListener('message', (evt) => {
        console.log(evt.data);
        obs.next(evt.data);
      });
      return () => es.close();
    });

  }
}
