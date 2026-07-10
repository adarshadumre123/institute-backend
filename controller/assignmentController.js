import Assignment from '../models/assignmentModel.js'
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const createAssignment = async (req, res) => {
   try {
      const { title, subject, course, description } = req.body

      if (!title || !course || !subject || !description) {
         return res.status(400).json({
            success: false,
            message: "all fields are required for exam"
         })
      }
      // check user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
      if (req.user.role !== "teacher") {
         return res.status(400).json({
            success: false,
            message: "Only teacher are authorized"
         })
      }

      const assignment = Assignment.create({
         title,
         subject,
         course,
         description,
         createdBy:req.user._id
      })

      res.status(200).json({
         success: true,
         message: "assignment create successfully",
         assignment
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}





export const getAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("createdBy", "firstName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};