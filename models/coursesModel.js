import mongoose from "mongoose";

const courseSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true 
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
})

const Course = mongoose.model('Course',courseSchema)

export default Course