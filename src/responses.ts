import { Response } from 'express';

const CODE_OK = 200;
const CODE_BAD_REQUEST = 400;
const SUCCESS_MESSAGE = 'Request successful';
const CODE_UNPROCESSABLE_ENTITY = 422;

export default class Responses {
  static success(res: Response, data: {}) {
    res.status(CODE_OK).json({
      success: true,
      data: data,
      message: SUCCESS_MESSAGE,
    });
  }
  static badRequest(res: Response, errorCode: number, message: string) {
    res.status(CODE_BAD_REQUEST).json({
      success: false,
      code: errorCode,
      message: message,
    });
  }
  static unprocessableEntity(res: Response, error: {}, errorCode = CODE_UNPROCESSABLE_ENTITY, message = 'Validation Failed') {
    res.status(CODE_UNPROCESSABLE_ENTITY).json({
      error: error,
      success: false,
      code: errorCode,
      message,
    });
  }
}