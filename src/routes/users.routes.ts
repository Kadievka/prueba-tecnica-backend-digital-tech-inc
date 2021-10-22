require('dotenv').config();
import express from 'express';
import jwtMiddleware from 'express-jwt';

import userController from '../controllers/user.controller';
import upsertUserValidator from '../middlewares/upsertUserValidator';
import activateUserValidator from '../middlewares/activateUserValidator';
import loginValidator from '../middlewares/loginUserValidator';
import getAllUsersValidator from '../middlewares/getAllUsersValidator';
import deleteUsersValidator from '../middlewares/deleteUsersValidator';
import updateUserValidator from '../middlewares/updateUserValidator';

const router = express.Router();

router.route('/get-all').get(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}),
  getAllUsersValidator,
  userController.getAllUsers
);
router.route('/delete-many').delete(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}),
  deleteUsersValidator,
  userController.deleteUsers
);
router.route('/create').post(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}),
  upsertUserValidator,
  userController.createUser
);
router.route('/activate').post(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}), activateUserValidator,
  userController.activateUser
);
router.route('/login').post(
  loginValidator,
  userController.login
);
router.route('/edit').put(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_AlGORITHM]}),
  updateUserValidator,
  userController.updateUser
);


module.exports = router;