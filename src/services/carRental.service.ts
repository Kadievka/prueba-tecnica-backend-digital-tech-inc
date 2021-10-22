import CarRental, { statusOptions } from '../models/CarRental';
import { CreateCarRentalDto, UpdateCarRentalDto } from '../dtos/carRental.dto';
import User from '../models/User';
import throwError from '../utils/throwError';
import userService from './user.service';

export default class CarRentalService {

  static async createCarRental(email: string, carRental: CreateCarRentalDto) {
    const user = await User.findOne({email});
    carRental.userId = user._id;
    const carRentalDb = await CarRental.findOne({
      carPlate: carRental.carPlate,
      rentFrom: { $lte: carRental.rentFrom },
      rentTo: { $gte: carRental.rentFrom }
    });
    userService.validateDateFormat(carRental.rentFrom);
    userService.validateDateFormat(carRental.rentTo);
    if(carRentalDb || carRental.rentFrom > carRental.rentTo){
      throwError('Invalid date for the rent');
    }
    userService.validateNumberPhone(carRental.phone);
    return CarRental.create(carRental);
  }

  static async getAllCarRentals(userId: string, filter: {
    filterColumn: string,
    sort: string,
    limit: string,
    skip: string
  }) {
    const column = filter.filterColumn;
    let sort = 1;
    if(filter.sort) {
      sort = filter.sort.toLowerCase() === 'asc' ? 1 : -1
    }
    const sortOptions = {};
    sortOptions[column] = sort;
    const limit = filter.limit ? parseInt(filter.limit) : 10;
    const skip = filter.skip ? parseInt(filter.skip) : 0;
    return CarRental.find({userId}).sort(sortOptions).limit(limit).skip(skip);
  }

  static async updateCarRental(userId: string, carRentalId: string, carRental: UpdateCarRentalDto) {
    const filter = {
      _id: carRentalId,
      userId: userId,
    };
    const carRentalDb = await CarRental.findOne(filter);
    const otherCarRental = await CarRental.findOne({
      _id: {$ne: carRentalId},
      carPlate: carRentalDb.carPlate,
      rentFrom: { $lte: carRental.rentFrom },
      rentTo: { $gte: carRental.rentFrom }
    });
    if(
      otherCarRental ||
      carRental.rentFrom > carRental.rentTo ||
      carRentalDb.rentFrom > carRental.rentTo ||
      carRental.rentFrom > carRentalDb.rentTo
      ) {
      throwError('Invalid date for the rent');
    }
    if(carRental.status){
      if(statusOptions.indexOf(carRental.status) < statusOptions.indexOf(carRentalDb.status) ||
        statusOptions.indexOf(carRental.status) === 0 ||
        carRentalDb.status === "CANCELED" ||
        carRentalDb.status === "DELIVERED"
      ) {
        throwError('Invalid status');
      }
    }
    const update = { ...carRental };
    const options = { new: true };
    return CarRental.findOneAndUpdate(filter, update, options);
  }

}