import Class from "../models/classModel.js"

export const createClass=async(req,res)=>{
  try {
      const{title,zoomLink,course,classDate}=req.body
      const{courseId}=req.params
      if(!title || !zoomLink || !course || !classDate){
          return res.status(400).json({
              success:false,
              message:"all fields are required"
          })
      }
      const newClass = await Class.create({
          title,
          zoomLink,
          course:courseId,
          classDate,
          createdBy:req.user._id
      })
      res.status(200).json({
          success:true,
          message:"class created successfully",
          class:newClass,
          course
      })
  } catch (error) {
     res.status(400).json({
            success: false,
            message: error.message
        })
  }
}

export const getAllClass = async(req,res)=>{
    try {
        const{courseId}=req.params
        const newClass = await Class.find({
            course:courseId
        }).populate("createdBy","firstName lastName email").populate("course",
            "course subject"
        )
        res.status(200).json({
            success:true,
            message:"class find successfully",
            newClass
        })
    } catch (error) {
         res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getClassById=async(req,res)=>{
    try {
        const{id}=req.params
        const newClass = await Class.findById(id).populate("createdBy","firstName lastName email")
        if(!newClass){
            return res.status(400).json({
                success:false,
                message:"class not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"class find successfully by Id",
            newClass
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteClass = async(req,res)=>{
    try {
        const {id}=req.params
        const newClass = await Class.findById(id)
        if(!newClass){
            return res.status(400).json({
                success:false,
                message:"class not found"
            })
        }
        if(newClass.createdBy.toString() !== req.user._id.toString()){
    return res.status(403).json({
        success:false,
        message:"Unauthorized"
    });
}
        await newClass.deleteOne();
        res.status(200).json({
            success:true,
            message:"clas deleted successfully",
            newClass
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}