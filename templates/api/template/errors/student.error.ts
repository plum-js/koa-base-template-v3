import { HttpError } from '../../../error'

/**
 * error instance of student
 */
export class StudentError extends HttpError {
  private static busiCode = '10'
  constructor(
    public code: string,
    public message: string,
    public detail: { [x: string]: any } = {}
  ) {
    super(200, code, message, detail, 'http://localhost:3000/swagger#student')
    this.code = `${StudentError.busiCode}${code}`
    this.name = StudentError.name
  }
}
