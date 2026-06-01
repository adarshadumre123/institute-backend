import User from './../models/userModels.js';
import Exam from './../models/examModel.js';
import Course from './../models/coursesModel.js';


export const getDetails=async(req,res)=>{
try {
    const  totalStudents = await User.countDocuments({role:'student'})
    const  totalTeachers = await User.countDocuments({role:'teacher'})
    const totalExam = await Exam.countDocuments()
    const totalCourse = await Course.countDocuments()
    res.status(200).json({
        success:true,
        stats:{
            totalStudents,
            totalCourse,
            totalExam,
            totalTeachers
        }
    })
} catch (error) {
 res.status(400).json({
    success:false,
    message:error.message
 })   
}
}