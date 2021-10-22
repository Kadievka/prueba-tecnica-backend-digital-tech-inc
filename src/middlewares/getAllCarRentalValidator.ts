import Responses from '../responses';
import { Request, Response, NextFunction } from 'express';
import middy from '@middy/core'
import validator from '@middy/validator'

const getAllCarRentalValidator = async (req: Request, res: Response, next: NextFunction) => {

  const data = req.query;

  const schema = {
    type: 'object',
    properties: {
      filterColumn: {
        type: 'string',
      },
      sort: {
        type: 'string',
      },
      limit: {
        type: 'string',
      },
      skip: {
        type: 'string',
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

export default getAllCarRentalValidator;
