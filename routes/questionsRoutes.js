import express from 'express'
import { createBulkQuestions, createQuestion, deleteQuestion, getAllQuestions, getQuestionsBySet, getSingleQuestion } from '../controller/QuestionController.js'
import userAuth from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import { updateQuestion } from './../controller/QuestionController.js';

const router = app.Router()

app.post('/create',userAuth,roleMiddleware("teacher"),createQuestion)
app.post('/create-bulk',userAuth,roleMiddleware("teacher"),createBulkQuestions)
app.get('/getAllQuestion',userAuth,roleMiddleware("teacher admin"),getAllQuestions)
app.get('/getSingleQuestion',userAuth,roleMiddleware("teacher admin"),getSingleQuestion)
app.put('/updateQuestion',userAuth,roleMiddleware("teacher admin"),updateQuestion)
app.delete('/deleteQuestion',userAuth,roleMiddleware("teacher admin"),deleteQuestion)
app.get('/getSet',userAuth,roleMiddleware("teacher admin"),getQuestionsBySet)


export default router