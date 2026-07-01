import express from 'express';
import { createClass } from '../controller/classController.js';
import userAuth from './../middleware/authMiddleware.js';
const router = express.Router();
router.post('/create-class',userAuth,createClass)
export default router