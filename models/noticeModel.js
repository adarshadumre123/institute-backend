import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    image: {
      type: String, 
      default: "",
    },

    publicId: {
      type: String,
      default: "",
    },
    expiresAt:{
        type:Date,
        default:null
    }
})

const Notice = mongoose.model("Notice",noticeSchema)

export default Notice