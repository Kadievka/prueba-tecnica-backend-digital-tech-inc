import Responses from '../responses';
import { Request, Response, NextFunction } from 'express';
import middy from '@middy/core'
import validator from '@middy/validator'

const createCarRentalValidator = async (req: Request, res: Response, next: NextFunction) => {

  const data = req.body;

  const schema = {
    type: 'object',
    required: ['customer', 'phone', 'carPlate', 'rentFrom', 'rentTo'],
    properties: {
      customer: {
        type: 'string',
        minLength: 3,
        maxLength: 250
      },
      phone: {
        type: 'string',
        minLength: 8,
        maxLength: 14
      },
      carPlate: {
        type: 'string',
        minLength: 4,
        maxLength: 8
      },
      rentFrom: {
        type: 'string',
        minLength: 10,
        maxLength: 10
      },
      rentTo: {
        type: 'string',
        minLength: 10,
        maxLength: 10
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

export default createCarRentalValidator;
