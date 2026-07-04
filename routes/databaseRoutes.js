import express from 'express'
import userAuth from './../middleware/authMiddleware.js';
import { database } from '../controller/databaseController.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
const router = express.Router();
router.get('/get-database',userAuth,roleMiddleware("admin"),database)
export default router