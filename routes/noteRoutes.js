import express from 'express'
import userAuth from './../middleware/authMiddleware.js';
import { roleMiddleware } from './../middleware/roleMiddleware.js';
import { deleteNote, getNote, getSingleNote, uploadNote } from '../controller/noteController.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = express.Router()

router.post('/upload',upload.single("file"),userAuth,
roleMiddleware("admin","teacher"),uploadNote)
router.get('/get-note',userAuth,getNote)
router.get('/get-single-note',userAuth,getSingleNote)
router.delete('/delete-note',userAuth,deleteNote)

export default router 