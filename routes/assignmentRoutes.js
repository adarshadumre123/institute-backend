import express from 'express'
import { roleMiddleware } from './../middleware/roleMiddleware.js';
import { createAssignment, generateAssignment, getAssignment } from '../controller/assignmentController.js';
import userAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-assignment',userAuth,roleMiddleware("teacher"),createAssignment);

router.post('/generate-assignment',userAuth,roleMiddleware("teacher"),generateAssignment);

router.get('/get-assignment',userAuth,roleMiddleware("teacher"),getAssignment);

export default router