import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../core/shared/models/User';

@Pipe({ name: 'prop' })
export class UserPipe implements PipeTransform {
  transform(users: User[], searchBy: string, search: string): User[] {
    if (searchBy && search && search.length > 0) {
      switch (searchBy) {
        case 'Username':
          return users.filter(user => user.username.toLowerCase().indexOf(search.toLowerCase()) >= 0);
        case 'Email':
          return users.filter(user => user.email.toLowerCase().indexOf(search.toLowerCase()) >= 0);
      }
    } else {
      return users;
    }
  }
}
