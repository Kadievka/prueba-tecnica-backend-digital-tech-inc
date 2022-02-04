import Responses from "../responses";
import FileHandlerService from "../services/fileHandler.service";
import { Response } from "express";

export default class FileHandlerController{

  static async jsonToPdf(req, res: Response) {
    try {
      const pdf = await FileHandlerService.jsonToPdf(req.body);
      Responses.success(res, pdf);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

}