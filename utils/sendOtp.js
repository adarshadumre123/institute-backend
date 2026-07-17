import nodemailer from 'nodemailer'

export const sendOtp=async(toEmail,otp)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            user:process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:toEmail,
        subject:'Otp is sent to recover password',
        html:`<p>your otp for password reset is :${otp}</p>`
    }
    await transporter.sendMail(mailOptions)
};