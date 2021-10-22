require('dotenv').config();
import Responses from '../responses';
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express';

const errorHandlingJWT = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    Responses.unauthorized(res);
  }
};

export default errorHandlingJWT;