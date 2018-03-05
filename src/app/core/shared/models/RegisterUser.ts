export class RegisterUser {
  username: string;
  password: string;
  email: string;

  constructor (u, p, e) {
    this.username = u;
    this.password = p;
    this.email = e;
  }
}
