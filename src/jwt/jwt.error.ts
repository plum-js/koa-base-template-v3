import { HttpError } from '../error';

class JwtError extends HttpError {
  private static prefix = '20';
  constructor(
    public code: string,
    public message: string,
    public detail: { [x: string]: any } = {}
  ) {
    super(200, code, message, detail, 'http://localhost:3000/swagger#auth');
    this.code = `${JwtError.prefix}${code}`;
    this.name = JwtError.name;
  }
}

export { JwtError };
