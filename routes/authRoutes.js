import express from 'express'
import { deleteUser, getAllUser, loginUser, registerUser } from '../controller/authController.js';
import userAuth from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/get',getAllUser);
router.delete('/delete/:id',deleteUser);

export default router



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDQxMzljNTllM2M4Mjg0ZWEwZTViZSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzc4NjUyMzUzLCJleHAiOjE3NzkyNTcxNTN9._YJhCN5EklYtkCUcQ_2jf_BJgIPUckjB8rO9LwUByNU