import mongoose, { mongo } from "mongoose";

const paymentSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    },
    paymentMethod:{
    type:String,
    default:"esewa"
    },
    status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending"
    },
    paidAt:Date
},{
    timestamps:true
})

export default mongoose.model("Payment",paymentSchema)