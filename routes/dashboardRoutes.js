import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { studentDashboard, teacherDashboard } from '../utils/dashboard.js';

const router = express.Router();

router.get('/teacher-dashboard',userAuth,teacherDashboard)
router.get('/student-dashboard',userAuth,studentDashboard)

export default router 