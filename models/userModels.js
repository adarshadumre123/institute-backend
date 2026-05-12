import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
     
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        
        email: {
            type: String,
            required: true,
            unique: true
        },
        
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "teacher", "admin"],
            default: "student"
        }
    
},{timestamps:true})

const User = mongoose.model("User", userSchema);

export default User;

