import Course from "../models/coursesModel.js";
import Enrollment from "../models/enrollmentModel.js";

export const enrolledCourse = async(req,res)=>{
   try {

    if(req.user.role!=="student"){
        return res.status(403).json({
            success:false,
            message:"Only students can enrolled course"
        })
    }
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
     
     if(Number(course.price)===0){
         const enrollment = await Enrollment.create({
             student:studentId,
             course:courseId,
         })
         course.enrolledStudents.push(studentId);
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
       console.log(error.message)
    res.status(500).json({
        success:false,
        message:error.message
    })
   }
}

