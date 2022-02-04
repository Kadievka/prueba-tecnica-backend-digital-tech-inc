require('dotenv').config();
import express from 'express';

import fileHandlerController from '../controllers/fileHandler.controller';

const router = express.Router();

router.route('/json-to-pdf').post(
  fileHandlerController.jsonToPdf
);

module.exports = router;