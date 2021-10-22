require('dotenv').config();
import express from 'express';
import jwtMiddleware from 'express-jwt';

import carRentalController from '../controllers/carRental.controller';
import createCarRentalValidator from '../middlewares/createCarRentalValidator';
import updateCarRentalValidator from '../middlewares/updateCarRentalValidator';
import getAllCarRentalValidator from '../middlewares/getAllCarRentalValidator';

const router = express.Router();

router.route('/create').post(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}),
  createCarRentalValidator,
  carRentalController.createCarRental
);

router.route('/edit/:id').put(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}),
  updateCarRentalValidator,
  carRentalController.updateCarRental
);

router.route('/get-all').get(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}),
  getAllCarRentalValidator,
  carRentalController.getAllCarRentals
);

module.exports = router;