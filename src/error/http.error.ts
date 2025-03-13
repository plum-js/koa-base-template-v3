/**
 * Class HttpError extends Error
 * ```ts
 * throw new HttpError(200, '-1', 'validate error', { "age": { "gt": 10 } }, "http://localhost:3000/swagger");
 * ```
 */
export class HttpError extends Error {
  /**
   * @param status  http status_code ,such as 200, 201, 401, 403 and so on
   * @param code business error code
   * @param message error message
   * @param details detail about error
   * @param refer error reference link, such as a swagger html
   */
  constructor(
    public status: number,
    public code: string,
    public message: string,
    public details: { [x: string]: any },
    public refer: string
  ) {
    super(message);
    this.name = HttpError.name;
  }
}
