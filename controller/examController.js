import Exam from "../models/examModel.js";

export const createExam = async (req, res) => {
  try {

    const {
      title,
      subject,
      description,
      duration,
      totalQuestions,
      totalMarks,
      passingMarks,
      startTime,
      endTime
    } = req.body;


    console.log(req.body)

    const exam = await Exam.create({
      title,
      subject,
      description,
      duration,
      totalQuestions,
      totalMarks,
      passingMarks,
      startTime,
      endTime,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getAllExam=async(req,res)=>{
try {
  const exam = await Exam.find()
    .populate("createdBy", "firstName lastName email")
    .sort({ createdAt: -1 });

    
  res.status(200).json({
    success: true,
    exam
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}
}

export const getSingleExam =async(req,res)=>{
  try {
    
    const exam = await Exam.findById(req.params.id).populate("createdBy","firstName lastName email").populate("allowedStudents","firstName lastName email")
    if(!exam){
      return res.status(400).json({
        success:false,
        message:'exam not found'
      })
    }

    return res.status(200).json({
        success:true,
        exam,
        status
      })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}

export const updateExam=async(req,res)=>{
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,req.body,
      {
        returnDocument: "after",
        runValidators:true
      }
    );
    if(!exam){
      return res.status(404).json({
        success:false,
        message:"exam not found"
      })
    }

    res.status(200).json({
      success:true,
      message:"exam updated successfully",
      exam
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}


export const deleteExam=async(req,res)=>{
  try {
    const exam = await Exam.findById(req.params.id)
    if(!exam){
      return res.status(404).json({
        success:false,
        messaage:'exam not found'
      })
    }
    await exam.deleteOne()
    res.status(200).json({
      success:true,
      message:"exam deleted successfully"
    })
  } catch (error) {
     res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}