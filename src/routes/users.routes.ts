require('dotenv').config();
import express from 'express';

import userController from '../controllers/user.controller';

const router = express.Router();
router
  .route('/get-all')
  .get(userController.getAllUsers);

module.exports = router;