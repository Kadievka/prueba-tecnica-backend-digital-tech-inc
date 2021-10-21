import Responses from "../responses";

export default class UserController{

  static async getAllUsers(req, res) {
    try {
      let users = [];
      Responses.success(res, users);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

}


