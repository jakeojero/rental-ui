export class User {
    email: string;
    id: string;
    isPremium: boolean;
    roles: Array<string>;
    username: string;

    constructor(id, e, p, r, u) {
      this.id = id;
      this.email = e;
      this.isPremium = p;
      this.roles = r;
      this.username = u;
    }
  }
