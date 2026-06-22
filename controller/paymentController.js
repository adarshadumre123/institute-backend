import coursesModel from '../models/coursesModel.js'
import Course from '../models/coursesModel.js'
import Enrollment from '../models/enrollmentModel.js'
import Payment from '../models/paymentModel.js'
import { generateTransactionId } from '../utils/generateTransactionId.js'



export const createPayment = async(req,res)=>{
    try {
        const{courseId}=req.body;
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }
        const enrolled = await Enrollment.findOne({
            student:req.user.id,
            course:courseId
        })
        if(enrolled){
            return res.status(400).json({
                success:false,
                message:"already enrolled"
            })
        }

        const transactionId = generateTransactionId()

        const payment = await Payment.create({
            student:req.user.id,
            course:courseId,
            amount:course.price,
            transactionId,
            paymentMethod:"eSewa",
            status:'pending',
        })

        return res.status(201).json({
            success:true,
            message:"payment created successfully",
            payment,
        })
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: error.message,
    });

    }
}