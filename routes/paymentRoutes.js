import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { createPayment, verifyPayment } from '../controller/paymentController.js';

const router = express.Router();

router.post('/create-payment',userAuth,createPayment)
router.get('/verify-payment',verifyPayment)

export default router