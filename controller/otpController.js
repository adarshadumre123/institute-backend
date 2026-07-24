


// import User from "../models/userModels.js";
// import bcrypt from "bcryptjs";
// import { sendOtpEmail } from "../utils/sendEmail.js";

// // ==================== Recover Password ====================

// export const recoverPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         if (!email) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email is required"
//             });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         // Generate 4-digit OTP
//         const otp = Math.floor(1000 + Math.random() * 9000).toString();

//         // Save OTP and expiry
//         user.resetOtp = otp;
//         user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

//         await user.save();

//         // Send OTP email
//         await sendOtpEmail(email, otp);

//         return res.status(200).json({
//             success: true,
//             message: "OTP sent successfully to your email"
//         });

//     } catch (error) {
//             console.error("Recover Password Error:", error);


//         return res.status(500).json({
//             success: false,
//             message: "Failed to send OTP"
//         });
//     }
// };


// // ==================== Verify OTP ====================

// export const verifyOtp = async (req, res) => {
//     try {

//         const { email, otp } = req.body;

//         if (!email || !otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email and OTP are required"
//             });
//         }

//         const user = await User.findOne({
//             email,
//             resetOtp: otp
//         });

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid OTP"
//             });
//         }

//         if (Date.now() > user.otpExpiry) {

//             user.resetOtp = null;
//             user.otpExpiry = null;

//             await user.save();

//             return res.status(400).json({
//                 success: false,
//                 message: "OTP has expired"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "OTP verified successfully"
//         });

//     } catch (error) {

//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "OTP verification failed"
//         });

//     }
// };


// // ==================== Reset Password ====================

// export const resetPassword = async (req, res) => {

//     try {

//         const { email, otp, newPassword } = req.body;

//         if (!email || !otp || !newPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required"
//             });
//         }

//         const user = await User.findOne({
//             email,
//             resetOtp: otp
//         });

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid OTP"
//             });
//         }

//         if (Date.now() > user.otpExpiry) {

//             user.resetOtp = null;
//             user.otpExpiry = null;

//             await user.save();

//             return res.status(400).json({
//                 success: false,
//                 message: "OTP has expired"
//             });

//         }

//         // Hash new password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(newPassword, salt);

//         // Update password
//         user.password = hashedPassword;

//         // Clear OTP
//         user.resetOtp = null;
//         user.otpExpiry = null;

//         await user.save();

//         return res.status(200).json({
//             success: true,
//             message: "Password reset successfully"
//         });

//     } catch (error) {

//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Password reset failed"
//         });

//     }
// };

import User from './../models/userModels.js';
import { sendOtpEmail } from './../utils/sendEmail.js';
export const recoverPasswords = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "email is required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "email is not registered"
            })
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        user.resetOtp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000
        await user.save();

        await sendOtpEmail(email, otp)

        return res.status(200).send({
            success:true,
            message:"otp has been send to user's email",
            otp:otp
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'failed to send otp '
        })
    }
}