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

import {GoogleGenerativeAI} from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const generateAssignment = async(req,res)=>{
  try {
    const { title, subject, course, description,totalQuestions , difficulty } = req.body
    if(!title || !subject || !course || !description || !totalQuestions || !difficulty){
       return res.status(400).json({
          success:false,
          message:"all fields are required"
       })
    }
 
    if(req.user.role!=='teacher'){
       return res.status(400).json({
          success:false,
          message:"only teacher are authorize to create assignment"
       })
    }
 
    const model = genAI.getGenerativeModel({
       model:"gemini-1.5-flash"
    });
 
    const prompt = `generate an academic assignment.
    Title:${title},
    subject:${subject},
    course:${course},
    description:${description},
    difficulty:${difficulty},
 
 
    Generate:
    Assignment Title
    Subject
    course
    Questions
    `
 
    const result = await model.generateContent(prompt)
 
    const response = await result.response
 
    const text = response.text()
 
    res.status(200).json({
       success:true,
       assignment:text
    })
    
  } catch (error) {
   res.status(500).json({
      success:false,
      message:error.message
   })
  }

}