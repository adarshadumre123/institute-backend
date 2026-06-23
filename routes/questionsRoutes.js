import express from 'express'
import { createBulkQuestions, createQuestion, deleteQuestion, getAllQuestions, getQuestionsBySet, getSingleQuestion } from '../controller/QuestionController.js'
import userAuth from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { updateQuestion } from './../controller/QuestionController.js';

const router = express.Router()

router.post('/create',userAuth,roleMiddleware("teacher"),createQuestion)
router.post('/create-bulk',userAuth,roleMiddleware("teacher"),createBulkQuestions)
router.get('/getAllQuestion',userAuth,getAllQuestions)
router.get('/getSingleQuestion',userAuth,getSingleQuestion)
router.put('/updateQuestion',userAuth,roleMiddleware("teacher", "admin"),updateQuestion)
router.delete('/deleteQuestion',userAuth,roleMiddleware("teacher", "admin"),deleteQuestion)
router.get('/getSet',userAuth,roleMiddleware("teacher", "admin"),getQuestionsBySet)


export default router 