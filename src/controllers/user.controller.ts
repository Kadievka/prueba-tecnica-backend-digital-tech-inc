import Responses from "../responses";
import userService from "../services/user.service";
import { Request, Response } from "express";
import { ADMIN_ROLE } from "../models/User";
export default class UserController{

  static async activateUser(req, res: Response) {
    try {
      const userEmail = req.user.email;
      const password = req.body.password;
      const user = await userService.activateUser(userEmail, password);
      Responses.success(res, user);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static async createUser(req, res: Response) {
    try {
      const userRole = await userService.getUserRole(req.user.email);
      if (userRole !== ADMIN_ROLE) {
        return Responses.unauthorized(res);
      }
      const user = await userService.createUser(req.body);
      Responses.success(res, user);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static async deleteUsers(req, res: Response) {
    try {
      const userRole = await userService.getUserRole(req.user.email);
      if (userRole !== ADMIN_ROLE) {
        return Responses.unauthorized(res);
      }
      const user = await userService.deleteUsers(req.body);
      Responses.success(res, user);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static async getAllUsers(req, res: Response) {
    try {
      const users = await userService.getAllUsers(req.user.email, req.query);
      Responses.success(res, users);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      Responses.success(res, user);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static async updateUser(req, res: Response) {
    try {
      const user = await userService.updateUser(req.user.email, req.body);
      Responses.success(res, user);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

}


