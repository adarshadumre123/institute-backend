import Course from '../models/coursesModel.js'
import Enrollment from '../models/enrollmentModel.js';
import Class from "../models/classModel.js"
import Assignment from './../models/assignmentModel.js';
import Exam from './../models/examModel.js';


export const teacherDashboard=async(req,res)=>{
    try {
        const teacherId=req.user._id;
        const courses = await Course.find({
            createdBy:teacherId
        })
        const courseIds = courses.map(course=>course._id)
        const totalStudents = await Enrollment.countDocuments({
            course:{
                $in:courseIds
            }
        })
        const totalClasses = await Class.countDocuments({
            course:{
                $in:courseIds
            }
        })

        const totalAssignments=await Assignment.countDocuments({
             course:{
                $in:courseIds
            }
        })
          const totalExams = await Exam.countDocuments({
            course: { $in: courseIds }
        });

       res.status(200).json({
            success: true,
            dashboard: {
                totalCourses: courses.length,
                totalStudents,
                totalClasses,
                totalAssignments,
                totalExams,
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}