import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PasswordService {

  constructor(private http: HttpClient) { }

  requestPasswordReset(user) {
    return this.http.post('/api/user/resetPassword', {username: user}, {observe: 'response'});
  }

  validateToken(token) {
    return this.http.get(`/api/user/validateResetToken?token=${token}`, {observe: 'response'});
  }

  updatePassword(user, password) {
    return this.http.post(`/api/user/updatePassword`, { id: user, password: password }, {observe: 'response'});
  }

}
