export class User {
    email: string;
    id: string;
    premium: boolean;
    roles: Array<string>;
    username: string;

    constructor(id, e, p, r, u) {
      this.id = id;
      this.email = e;
      this.premium = p;
      this.roles = r;
      this.username = u;
    }
  }
