import express from 'express';
import { createClass, deleteClass, getAllClass } from '../controller/classController.js';
import userAuth from './../middleware/authMiddleware.js';
const router = express.Router();
router.post('/create-class/:courseId',userAuth,createClass)
router.get('/getAllClass/:courseId',userAuth,getAllClass)
router.delete('/delete-class',userAuth,deleteClass)
export default router