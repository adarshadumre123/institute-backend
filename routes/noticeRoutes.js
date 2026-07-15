import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { createNotice, getAllNotices } from '../controller/noticeController.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = express.Router();

router.post("/upload-notice",upload.single("file"),userAuth,roleMiddleware("admin"),createNotice)

router.get("/get-notice",userAuth,getAllNotices);

export default router