import Enrollment from "../models/enrollmentModel.js";
import Exam from "../models/examModel.js";
import Assignment from './../models/assignmentModel.js';
import Class from './../models/classModel.js';
import User from './../models/userModels.js';
import Course from './../models/coursesModel.js';



export const database=async(req,res)=>{
    try {
const enrollments = await Enrollment.find()
    .populate("student")
    .populate("course")
    .populate("payment");

const courses = await Course.find();
const exams = await Exam.find();
const assignments = await Assignment.find();
// const notes = await Note.find();
const classes = await Class.find();

res.status(200).json({
    success:true,
    message:"all data fetched successfully",
    enrollments,
    courses,
    exams,
    assignments,
    // notes,
    classes,
});
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
      
    });
    }
}
