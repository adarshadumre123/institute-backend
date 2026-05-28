import Course from '../models/coursesModel.js'
export const createCourse=async(req,res)=>{
    try {
        const {course,subject,price,description}=req.body;
        if(!course || !subject || !price || !description){
           return res.status(400).json({
               message:"all course field are required" 
            })
        }
        const coursed=await Course.create({
            course,
            subject,
            price,
            description,
            createdBy:req.user.id
        })
        res.status(200).json({
            success:true,
            message:"exam created successfully"
        })
    } catch (error) {
         res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const getAllCourse=async(req,res)=>{
    try {
        const course = await Course.find().populate("createdBy","firstName lastName email")
        res.status(200).json({
            success:true,
            message:"course get successfully"
        })
    } catch (error) {
         res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const getCourseById=async(req,res)=>{
    try {
        const{id}=req.params
        const course = await Course.findById(req.params.id).populate("createdBy","firstName lastName email").populate("allowedStudents","firstName lastName email")
        if(!course){
            return res.status({
                message:"no course are find from this id "
            })
        }
        res.status(200).json({
            success:true,
            message:'course updated successfully'
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


export const updateCourse=async(req,res)=>{
    try {
        const course = await Course.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runVaidators:true
        })
    
        if(!course){
            return res.status(400).json({
                message:"course are not available"
            })
        }
        res.status(200).json({
            success:true,
            message:"course updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteCourse=async(req,res)=>{
  try {
      const {course}=await Course.findById(req.params.id)
      if(!course){
          return res.status(400).json({
              success:false,
              message:"course created successfully"
          })
      }
      await course.deleteOne()
      return res.status(200).json({
          success:true,
          message:"course deleted successfully"
      })
  } catch (error) {
    res.status(400).json({
        success:false,
        message:error.message
    })
  }
}