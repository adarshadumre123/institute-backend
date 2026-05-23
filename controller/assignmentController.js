import Assignment from '../models/assignmentModel.js'
import { bcrypt } from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const createAssignment=async(req,res)=>{
   try {
     const{title,subject,course,description}=req.body
 
     if(!title || !course || !subject || !description){
         return res.status(400).json({
            success:false,
            message:"all fields are required for exam"
         })
     }
     
   } catch (error) {
    
   }
}