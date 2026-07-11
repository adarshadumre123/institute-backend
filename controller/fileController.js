import uploadOnCloudinary from "./cloudinary.js";
import { v2 as cloudinary } from 'cloudinary'
import File from './../models/fileModel.js';


export const uploadFile = async (req, res) => {
    try {
        const { title } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required"
            })
        }

        const cloudniaryResponse = await uploadOnCloudinary(req.file.path)
        if (!cloudniaryResponse) {
            return res.status(500).json({
                success: false,
                message: "File upload failed"
            })
        }
        const file = await File.create({
            title,
            file: cloudniaryResponse.secure_url,
            publicId: cloudniaryResponse.public_id
        })
        return res.status(201).json({
            success: true,
            message: "file uploaded successfully",
            file
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const getAllFile = async (req, res) => {
    try {
        const file = await File.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            file
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({
                success: false,
                message: "file not found"
            })
        }

        if (file.publicId) {
            await cloudinary.uploader.destroy(file.publicId)
        }
        await File.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "File deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}