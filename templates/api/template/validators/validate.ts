import { postSchema, getSchema } from './definition'
import { StudentError } from '../errors/student.error'

/**
 * validate
 * @param data data ready to check
 * @param strict set true while post or put, set false when patch/:id, get/:id, delete/:id
 */
export function validate(
  data: { [x: string]: any }[] | { [x: string]: any },
  strict = false
): void {
  const ts: { [x: string]: any }[] = [].concat(data)
  const schema = strict ? postSchema : getSchema
  for (const t of ts) {
    const res = schema.validate(t)
    if (res.error) throw new StudentError('05', 'validate error', res)
  }
}
