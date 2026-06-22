import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { createPayment } from '../controller/paymentController.js';

const router = express.Router();

router.post('/create-payment',userAuth,createPayment)

export default router