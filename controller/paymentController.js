import Course from '../models/coursesModel.js'
import Enrollment from '../models/enrollmentModel.js'
import Payment from '../models/paymentModel.js'
import { generateEsewaSignature } from '../utils/esewaSignature.js'
import { generateTransactionId } from '../utils/generateTransactionId.js'



export const createPayment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "course not found"
            })
        }
        const enrolled = await Enrollment.findOne({
            student: req.user.id,
            course: courseId
        })
        if (enrolled) {
            return res.status(400).json({
                success: false,
                message: "already enrolled"
            })
        }

        const transactionId = generateTransactionId()

        const payment = await Payment.create({
            student: req.user.id,
            course: courseId,
            amount: course.price,
            transactionId,
            paymentMethod: "eSewa",
            status: 'pending',
        })

        const productCode = process.env.ESEWA_PRODUCT_CODE;

        const signature = generateEsewaSignature(
            course.price,
            transactionId,
            productCode
        );



        return res.status(201).json({
            success: true,
            paymentId: payment._id,
            paymentData: {
                amount: course.price,
                tax_amount: 0,
                total_amount: course.price,

                transaction_uuid: transactionId,

                product_code: productCode,

                product_service_charge: 0,
                product_delivery_charge: 0,

                success_url: `${process.env.BACKEND_URL}/api/v1/payment/verify-payment`,

                failure_url: `${process.env.FRONTEND_URL}/payment-failed`,

                signed_field_names:
                    "total_amount,transaction_uuid,product_code",

                signature,
            },

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}