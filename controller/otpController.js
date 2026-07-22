// import User from "../models/userModels.js"
// import { sendOtpEmail } from './../utils/sendEmail';
// import  bcrypt  from 'bcryptjs';

// export const recoverPassword = async (req, res) => {
//     try {
//         const { email } = req.body
//         if (!email) {
//             return res.status(400).json({
//                 success: false,
//                 message: "email is required"
//             })
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "email is not registered"
//             })
//         }

//         const otp = Math.floor(1000 + Math.random() * 9000)
//         user.resetOtp = otp;
//         user.otpExpiry = Date.now() + 5 * 60 * 1000;
//         await user.save()
//         await sendOtpEmail(email, otp)

//         res.status(200).json({
//             success: true,
//             message: "OTP number has been sent to the user's email",

//         })
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: 'failed to send random otp'
//         })
//     }
// }

// const handleVerifyOtp = async (req, res) => {
//     const { email, otp } = req.body
//     try {
//         const otpRecord = await User.findOne({ email, resetOtp:otp
            
//          })
//         if (!otpRecord || Date.now() > otpExpiry) {
//             return res.status(400).json({
//                 success: false,
//                 message: "invalid or expired otp"
//             })
//         }
//         if(otp!=otpRecord.resetOtp){
//             return res.status(400).json({
//                 success:false,
//                 message:"otp does not matched"
//             })
//         }
//         res.status(200).json({
//             success: true,
//             message: "otp verification success"
//         })
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: 'failed to send random otp'
//         })
//     }
// }

// export const handleResetPassword = async(req,res)=>{
//     const{email,otp,newPassword}=req.body;
//     try {
//          const otpRecord = await User.findOne({ email, resetOtp:otp })
//         if (!otpRecord || Date.now() > otpRecord.otpExpiry) {
//             return res.status(400).json({
//                 success: false,
//                 message: "invalid or expired otp"
//             })
//         }
//         const user = await User.findOne({email})
//         if(!user){
//             return res.status(400).json({
//                 success:false,
//                 message:"user not found"
//             })
//         }
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(newPassword,salt)
//         user.password=hashedPassword
//         await User.deleteMany({email})
//         res.status(200).json({
//             success:false,
//             message:"password reset successfully"
//         })
//     } catch (error) {
//         return res.status(400).json({
//             success: false,
//             message: 'failed to send random otp'
//         })
//     }
// }


import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../utils/sendEmail.js";

// ==================== Recover Password ====================

export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Save OTP and expiry
        user.resetOtp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        await user.save();

        // Send OTP email
        await sendOtpEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};


// ==================== Verify OTP ====================

export const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const user = await User.findOne({
            email,
            resetOtp: otp
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (Date.now() > user.otpExpiry) {

            user.resetOtp = null;
            user.otpExpiry = null;

            await user.save();

            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "OTP verification failed"
        });

    }
};


// ==================== Reset Password ====================

export const resetPassword = async (req, res) => {

    try {

        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({
            email,
            resetOtp: otp
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (Date.now() > user.otpExpiry) {

            user.resetOtp = null;
            user.otpExpiry = null;

            await user.save();

            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });

        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;

        // Clear OTP
        user.resetOtp = null;
        user.otpExpiry = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Password reset failed"
        });

    }
};