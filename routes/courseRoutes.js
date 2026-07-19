import express from 'express'
import { createCourse, deleteCourse, getAllCourse, getCourseById, landingPageCourse, updateCourse } from '../controller/courseController.js'
import userAuth from './../middleware/authMiddleware.js';
import { roleMiddleware } from './../middleware/roleMiddleware.js';
import isEnrolled from './../middleware/enrollmentMiddleware.js';

const router = express.Router()

router.post('/create-course',userAuth,roleMiddleware("admin","teacher"),createCourse)
router.get('/get-course',userAuth,getAllCourse)
router.get('/landing-page-course',landingPageCourse)
router.get('/get-course-id/:id',userAuth,getCourseById)
router.put('/update-course',updateCourse,userAuth,roleMiddleware("admin","teacher"))
router.delete('/delete-course/:id',userAuth,roleMiddleware("admin","teacher"),deleteCourse)
export  default router