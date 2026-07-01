import express from 'express';
import { createClass, getAllClass } from '../controller/classController.js';
import userAuth from './../middleware/authMiddleware.js';
const router = express.Router();
router.post('/create-class',userAuth,createClass)
router.get('/getAllClass',userAuth,getAllClass)
export default router