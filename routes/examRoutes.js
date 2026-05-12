import express from 'express'
import userAuth from './../middleware/authMiddleware';
const router = express.Router()

router.post('/create',userAuth,)
export default router