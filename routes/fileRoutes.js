import express from 'express'
import { upload } from '../middleware/multerMiddleware.js'
import { deleteFile, getAllFile, uploadFile } from '../controller/fileController.js'

const router = express.Router()

router.post("/upload-file",upload.single("file"),uploadFile)
router.get('/get-file',getAllFile)
router.delete('/delete-file/:id',deleteFile)

export default router