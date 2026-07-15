import uploadOnCloudinary, { deleteFromCloudinary } from "./cloudinary.js"
import Note from '../models/noteModel.js'

export const uploadNote = async (req, res) => {
    try {
        const { title, description} = req.body
        const{courseId}=req.params;

        if (!title || !courseId) {
            return res.status(400).json({
                success: false,
                message: "title and course are required"
            })
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "please upload a file"
            })
        }
        const uploadedFile = await uploadOnCloudinary(req.file.path)
        if (!uploadedFile) {
            return res.status(500).json({
                success: false,
                message: "cloudinary upload failed"
            })
        }

        const note = await Note.create({
            title,
            description,
            course:courseId,
            teacher: req.user._id,
            fileUrl: uploadedFile.secure_url,
            publicId: uploadedFile.public_id,
            fileType: uploadedFile.resource_type,
            originalName: req.file.originalname,
            size: req.file.size,
        })

        res.status(201).json({
            success: true,
            message: "Note uploaded successfully",
            note
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const getNote = async (req, res) => {
    try {
        const { courseId } = req.params
        const notes = await Note.find({
            course: courseId,
        }).sort({
            createdAt: -1,
        })

        res.status(200).json({
            success: true,
            notes
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


export const getSingleNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate("teacher", "name email")
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        res.status(200).json({
            success: true,
            note
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error.message'
        })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "note not found"
            })
        }
        if (note.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'unauthorized'
            })
        }
        await deleteFromCloudinary(note.publicId)
        await note.deleteOne();
        res.status(200).json({
            success: true,
            message: "note deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}