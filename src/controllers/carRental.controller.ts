import Responses from "../responses";
import carRentalService from "../services/carRental.service";
import { Response } from "express";
export default class CarRentalController{

  static async createCarRental(req, res: Response) {
    try {
      const carRental = await carRentalService.createCarRental(req.user.email, req.body);
      Responses.success(res, carRental);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static async getAllCarRentals(req, res: Response){
    try {
      const carRentals = await carRentalService.getAllCarRentals(req.user.id, req.query);
      Responses.success(res, carRentals);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

  static async updateCarRental(req, res: Response) {
    try {
      const carRental = await carRentalService.updateCarRental(req.user.id, req.params.id, req.body);
      Responses.success(res, carRental);
    } catch (error) {
      Responses.badRequest(res, error.code, error.message);
    }
  }

}


