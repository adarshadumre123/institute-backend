import mongoose from "mongoose"
import Groq from "groq-sdk";


const assignmentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
        required:true
    },
   
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
    },
    totalQuestions:{
        type:Number,
    }, 
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
},{
    timestamps:true
}
)

const Assignment = mongoose.model("Assignment",assignmentSchema)

export default Assignment