import express from 'express'
import { roleMiddleware } from './../middleware/roleMiddleware.js';
import { createAssignment, getAssignment } from '../controller/assignmentController.js';
import userAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-assignment',userAuth,roleMiddleware("teacher"),createAssignment);
router.get('/get-assignment',userAuth,roleMiddleware("teacher"),getAssignment);

export default router