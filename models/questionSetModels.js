// import mongoose from "mongoose";

// const questionSchema=new mongoose.Schema({
//     question:{
//         type:String,
//         required:true
//     },
//     options:{
//         type:[String],
//         required:true
//     },
//     correctAnswer:{
//         type:String,
//         required:true
//     },
//     marks:{
//         type:Number,
//         default:1
//     }

// });


// const questionSchema = new mongoose.Schema({
//     setName:{
//         type:String,
//         required:true
//     },
//     questions:{
//         type:[questionSchema],
//         required:true
//     },

//     createdBy:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User",
//         }
// },{
//     timestamps:true
// }
// )


// const QuestionSet = mongoose.model("QuestionSet",questionSchema);

// export default QuestionSet