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

export const getAssignment=async(req,res)=>{
   try {
      const assignment = await Assignment.find().populate("createdBy", "firstName lastName email role")
      res.status(200).json({
         success:true,
         assignment
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}