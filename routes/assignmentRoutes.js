import express from 'express'
import { roleMiddleware } from './../middleware/roleMiddleware.js';
import { createAssignment, getAssignment,generateAssignment } from '../controller/assignmentController.js';
import userAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-assignment',userAuth,roleMiddleware("teacher"),createAssignment);

router.post('/generate-assignment/:courseId',userAuth,roleMiddleware("teacher","admin"),generateAssignment);

router.get('/get-assignment/:courseId',userAuth,getAssignment);

export default router