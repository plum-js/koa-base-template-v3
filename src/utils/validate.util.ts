import joi from 'joi';
/**
 * validate
 * @param data data ready to check
 * @param schema joi.schema
 */
export function validate(
  data: { [x: string]: any }[] | { [x: string]: any },
  schema: joi.Schema
): joi.ValidationError[] {
  const ts: { [x: string]: any }[] = [].concat(data);
  const errors: joi.ValidationError[] = [];
  for (const t of ts) {
    const res: joi.ValidationResult = schema.validate(t);
    if (res.error) errors.push(res.error);
  }
  return errors;
}
