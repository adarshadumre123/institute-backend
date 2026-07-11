import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

});


cloudinary.api
  .ping()
  .then((res) => console.log("PING:", res))
  .catch((err) => console.log("PING ERROR:", err));



const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){
            return null
        }

         console.log("Path:", localFilePath);
    console.log(
      "File exists:",
      fs.existsSync(localFilePath)
    );

        const res =await cloudinary.uploader.upload(localFilePath,{
            resource_type:"raw"
        })
        fs.unlinkSync(localFilePath);

        console.log("file is upload on cloudinay",res.url)
        return res
    } catch (error) {
            console.log("Cloudinary Error:", error);

     console.dir(error, { depth: null });

  if (localFilePath && fs.existsSync(localFilePath)) {
    fs.unlinkSync(localFilePath);
  }

  return null;
    }
}

export default uploadOnCloudinary