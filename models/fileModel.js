import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    file:{
        type:String,
        required:true
    },
    publicId:{
    type:String
    }
},{
    timestamps:true,
})

const File = mongoose.model("File",fileSchema)

export default File;