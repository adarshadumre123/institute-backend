import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        trim:true
    },
    options:[
    {
        type:String,
        required:true
    },
    ],
    correctAnswer:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        default:1,
    },
    setNumber:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true
}
)

const Question = mongoose.model("Question", questionSchema);

export default Question;