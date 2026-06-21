import Course from '../models/coursesModel.js'
import Enrollment from '../models/enrollmentModel.js'
export const createPayment = async(req,res)=>{
    try {
        const{courseId}=req.body
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }
        const enrolled=await Enrollment.findOne({
            student:req.user.id,
            course:courseId
        })
        if(enrolled){
            return res.status(400).json({
                success:false,
                message:"you are already enrolled in the course"
            })
        }
    } catch (error) {
     res.status(500).json({
     success: false,
     message: error.message,
    });
}
}
