import { Injectable } from '@angular/core';
import { NavbarService } from '../../navbar/navbar.service';
import { User } from '../../../core/shared/models/User';
import { PropertylistService } from '../../propertylist/propertylist.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PremiumService {

  user: User;

  constructor(private navbar: NavbarService, private http: HttpClient) {

    this.navbar.getUser().subscribe(user => {
      this.user = user;
    });

  }

  getProperties() {
    const headers = new HttpHeaders({
      'X-AUTH-TOKEN': `${window.localStorage.getItem('token')}`
    });

    return this.http.get(`/api/premium/properties?username=${this.user.username}`, {headers: headers});
  }

  
}
