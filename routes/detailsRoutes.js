import express from 'express'
import userAuth from './../middleware/authMiddleware.js';
import { roleMiddleware } from './../middleware/roleMiddleware.js';
import { getDetails } from '../controller/detailsController.js';

const router = express.Router();

router.get('/get-details',getDetails)

export default router;