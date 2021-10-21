const CODE_OK = 200;
const CODE_BAD_REQUEST = 400;
const SUCCESS_MESSAGE = 'Request successful';

export default class Responses {
  static success(res, data) {
    res.status(CODE_OK).json({
      success: true,
      data: data,
      message: SUCCESS_MESSAGE,
    });
  }

  static badRequest(res, errorCode, message) {
    res.status(CODE_BAD_REQUEST).json({
      success: false,
      code: errorCode,
      message: message,
    });
  }

}