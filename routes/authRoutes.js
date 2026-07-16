import express from 'express'
import { deleteUser, getAllUser, getUserById, loginUser, registerUser, updateUser } from '../controller/authController.js';
import userAuth from './../middleware/authMiddleware.js';
import { roleMiddleware } from './../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/get',userAuth,getAllUser);
router.get('/get-user',userAuth,getUserById);
router.delete('/delete/:id',roleMiddleware("admin"),deleteUser);
router.put('/update-profile',userAuth,updateUser);
router.put('/change-role/:userId',userAuth,roleMiddleware("admin"),updateUser);

export default router



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDQxMzljNTllM2M4Mjg0ZWEwZTViZSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzc4NjUyMzUzLCJleHAiOjE3NzkyNTcxNTN9._YJhCN5EklYtkCUcQ_2jf_BJgIPUckjB8rO9LwUByNU