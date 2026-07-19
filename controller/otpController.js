import User from "../models/userModels.js"
import { sendOtpEmail } from './../utils/sendEmail';

export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "email is required"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "email is not registered"
            })
        }

        const otp = Math.floor(1000 + Math.random() * 9000)
        user.resetOtp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;
        await user.save()
        await sendOtpEmail(email, otp)

        res.status(200).json({
            success: true,
            message: "OTP number has been sent to the user's email",
            otp

        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'failed to send random otp'
        })
    }
}

const handleVerifyOtp = async (req, res) => {
    const { email, otp } = req.body
    try {
        const otpRecord = await User.findOne({ email, otp })
        if (!otpRecord || Date.now() > otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "invalid or expired otp"
            })
        }
        res.status(200).json({
            success: true,
            message: "otp verification success"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'failed to send random otp'
        })
    }
}

export const handleResetPassword = async(req,res)=>{
    const{email,otp,newPassword}=req.body;
    try {
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'failed to send random otp'
        })
    }
}