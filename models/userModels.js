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
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
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
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    resetOtp: {
        type: String,
        default: null
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;

