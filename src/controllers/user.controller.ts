import Responses from "../responses";
import userService from "../services/user.service";

export default class UserController{

  static async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      Responses.success(res, user);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static getAllUsers(req, res) {
    try {
      const users = userService.getAllUsers();
      Responses.success(res, users);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

}


