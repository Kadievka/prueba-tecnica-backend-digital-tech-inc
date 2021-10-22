import Responses from '../responses';
import { Request, Response, NextFunction } from 'express';
import middy from '@middy/core'
import validator from '@middy/validator'

const upsertUserValidator = async (req: Request, res: Response, next: NextFunction) => {

  const data = req.body;

  const schema = {
    type: 'object',
    required: ['email', 'names', 'lastNames', 'phone', 'address', 'birthdate', 'role'],
    properties: {
      email: {
        type: 'string',
        minLength: 3,
        maxLength: 150
      },
      names: {
        type: 'string',
        minLength: 3,
        maxLength: 100
      },
      lastNames: {
        type: 'string',
        minLength: 3,
        maxLength: 100
      },
      phone: {
        type: 'string',
        minLength: 8,
        maxLength: 14
      },
      address: {
        type: 'string',
        minLength: 3,
        maxLength: 250
      },
      birthdate: {
        type: 'string',
        minLength: 10,
        maxLength: 10
      },
      role: {
        type: 'number'
      }
    }
  };

  const handler = middy();

  handler.use(validator({
    inputSchema: schema
  }));

  try {
    await handler(data, undefined, () => {
      return 0;
    });
  } catch (error) {
    return Responses.unprocessableEntity(res, error);
  }

  next();

};

export default upsertUserValidator;
