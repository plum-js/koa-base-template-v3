import { HttpError } from '../error';

/**
 * error instance of student
 */
class RestError extends HttpError {
  private static prefix = '10';
  constructor(
    public code: string,
    public message: string,
    public detail: { [x: string]: any } = {}
  ) {
    super(200, code, message, detail, 'http://localhost:3000/swagger#student');
    this.code = `${RestError.prefix}${code}`;
    this.name = RestError.name;
  }
}

export { RestError };
