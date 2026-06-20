import express from 'express'
import { createSubject, deleteSubject, getAllSubject, getSubjectById, updateSubject } from '../controller/subjectController.js';
import userAuth from './../middleware/authMiddleware.js';
import { roleMiddleware } from './../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/create-subject',userAuth,roleMiddleware("teacher","admin"),createSubject)
router.get('/get-subject',userAuth,getAllSubject)
router.get('/get-subject/id',userAuth,roleMiddleware,getSubjectById)
router.put('/update-subject',userAuth,roleMiddleware("teacher","admin"),updateSubject)
router.delete('/delete-subject',userAuth,roleMiddleware("teacher","admin"),deleteSubject)

export default router