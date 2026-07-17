import User from "../models/userModels.js"
import { sendOtpEmail } from './../utils/sendEmail';

export const recoverPassword=async(req,res)=>{
    try {
        const {email}=req.body
        if(!email){
            return res.status(400).json({
                success:false,
                message:"email is required"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"email is not registered"
            })
        }

        const otp = Math.floor(100+Math.random()*9000)
        user.resetOtp=otp;
        user.otpExpiry=Date.now()+5*60*100;
        await user.save()
        await sendOtpEmail(email,otp)

        res.status(200).json({
            success:true,
            message:"OTP number has been sent to the user's email",
            otp

        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'failed to send random otp'
        })
    }
}