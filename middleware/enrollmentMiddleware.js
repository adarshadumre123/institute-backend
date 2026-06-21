import Enrollment from "../models/enrollmentModel.js";

const isEnrolled=async(req,res,next)=>{
    try {
        const courseId = req.params.courseId || req.body.courseId
        const enrollment = await Enrollment.findOne({
            student:req.user.id,
            course:courseId
        })
        if(!enrollment){
            return res.status(403).json({
                success:false,
                message:'you are not enrolled in this course'
            })
        }
        next();
    } catch (error) {
         res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export default isEnrolled;