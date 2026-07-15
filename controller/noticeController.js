import Notice from "../models/noticeModel.js"
import uploadOnCloudinary from "./cloudinary.js"

export const createNotice = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "title and description are required"
            })
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "file is required"
            })
        }
        const uploadFile = await uploadOnCloudinary(req.file.path)
        console.log(uploadFile)
        if (!uploadFile) {
            return res.status(500).json({
                success: false,
                message: "cloudinary upload failed"
            })
        }
        const notice = await Notice.create({
            title,
            description,
            image: uploadFile.secure_url,
            createdBy:req.user._id,
            publicId: uploadFile.public_id,
            
        })

        res.status(201).json({
            success: true,
            message: "Note uploaded successfully",
            notice
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getAllNotices = async(req,res)=>{
    try {
        const notice = await Notice.find().populate("createdBy","firstName lastName email")
        res.status(200).json({
            success:true,
            message:"notice fetched sucessfully",
            notice
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}