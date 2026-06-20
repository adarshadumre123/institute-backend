import Course from "../models/coursesModel.js";
import Enrollment from "../models/enrollmentModel.js";

export const enrolledCourse = async(req,res)=>{
   try {
     const{courseId}=req.body;
     const studentId = req.user.id
     const course = await Course.findById(courseId)
     if(!course){
         return res.status(404).json({
             success:false,
             message:"course not found"
         })
     }
     const alreadyEnrolled = await Enrollment.findOne({
         student:studentId,
         course:courseId
     })
     if(alreadyEnrolled){
         return res.status(400).json({
             success:false,
             message:'already enrolled'
         })
     }
     if(course.price===0){
         const enrollment = await Enrollment.create({
             student:studentId,
             course:courseId,
             paymentStatus:"completed"
         })

         await course.save();
         return res.status(200).json({
             success:true,
             message:"enrolled successfully",
             enrollment
         })
     };
     return res.status(201).json({
         success:true,
         paymentRequired:true,
         amount:course.price,
         courseId
     })
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}