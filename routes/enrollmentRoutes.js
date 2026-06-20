import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { enrolledCourse } from '../controller/enrollmentController.js';

const router = express.Router();

router.post("/enroll",userAuth,enrolledCourse)

export default router