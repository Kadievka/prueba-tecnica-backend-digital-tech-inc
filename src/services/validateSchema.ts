import throwError from '../utils/throwError';

export default function validateSchema(schema: any, data: any): void {
  const { error } = schema.validate(data);
  if (error) {
    throwError(error.details[0].message)
  }
}