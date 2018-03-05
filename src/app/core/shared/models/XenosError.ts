export class XenosError {
  status: string;
  code: string;
  message: string;

  constructor(st, c, m) {
    this.status = st;
    this.code = c;
    this.message = m;
  }
}
