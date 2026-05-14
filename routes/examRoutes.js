import express from 'express'
import userAuth from './../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { createExam, deleteExam, getAllExam, getSingleExam, updateExam } from '../controller/examController.js';
const router = express.Router()

router.post('/create',userAuth,roleMiddleware("teacher","admin"),createExam)

router.get("/get-Exam",userAuth,getAllExam)
router.get("/getExamsById/:id",userAuth,getSingleExam)
router.put(
  "/update/:id",
  userAuth,
  roleMiddleware("teacher", "admin"),
  updateExam
);
router.delete("/delete/:id",userAuth,roleMiddleware("admin"),deleteExam)


export default router