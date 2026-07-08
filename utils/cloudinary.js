import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){
            return null
        }
        const res =await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        fs.unlinkSync(localFilePath);

        console.log("file is upload on cloudinay",res.url)
        return res
    } catch (error) {
     if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        } //remove the locally saved temp files as the upload operation got failed
        return null
    }
}

export default uploadOnCloudinary