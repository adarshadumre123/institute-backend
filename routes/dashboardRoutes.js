import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { teacherDashboard } from '../utils/dashboard.js';

const router = express.Router();

router.get('/teacher-dashboard',userAuth,teacherDashboard)

export default router