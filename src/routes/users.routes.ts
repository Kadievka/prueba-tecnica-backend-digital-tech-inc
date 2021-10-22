require('dotenv').config();
import express from 'express';

import userController from '../controllers/user.controller';
import upsertUserValidator from '../middlewares/upsertUserValidator';

const router = express.Router();

router.route('/get-all').get(userController.getAllUsers);
router.route('/create').post(upsertUserValidator, userController.createUser);

module.exports = router;