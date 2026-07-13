import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fileUrl:{
        type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    originalName:{
        type:String
    },
    size:{
        type:Number
    }
},{
    timestamps:true
}
)

export default mongoose.model("Note",noteSchema)