import Responses from '../responses';
import { Request, Response, NextFunction } from 'express';
import middy from '@middy/core'
import validator from '@middy/validator'

const loginUserValidator = async (req: Request, res: Response, next: NextFunction) => {

  const data = req.body;

  const schema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        minLength: 3,
        maxLength: 150
      },
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 25
      },
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

export default loginUserValidator;
