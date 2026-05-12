import express from 'express'
import { deleteUser, getAllUser, loginUser, registerUser } from '../controller/authController.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/get',getAllUser);
router.delete('/delete/:id',deleteUser);

export default router