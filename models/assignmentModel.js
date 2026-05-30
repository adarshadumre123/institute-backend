import mongoose from "mongoose"

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
    numberOfQuestion:{
        type:Number,
        required:true
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"],
        required:true
    },
    totalQuestions:{
        type:Number,
        required:true
    }
},{
    timestamps:true
}
)

const Assignment = mongoose.model("Assignment",assignmentSchema)

export default Assignment