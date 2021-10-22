import Responses from '../responses';
import { Request, Response, NextFunction } from 'express';
import middy from '@middy/core'
import validator from '@middy/validator'
import throwError from '../utils/throwError';

const updateUserValidator = async (req: Request, res: Response, next: NextFunction) => {

  const data = req.body;

  const schema = {
    type: 'object',
    properties: {
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
      password: {
        type: 'string',
        minLength: 8,
        maxLength: 25
      },
    }
  };

  const handler = middy(()=>{
    if(data.email){
      throwError('email is not allowed');
    }
  });

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

export default updateUserValidator;
