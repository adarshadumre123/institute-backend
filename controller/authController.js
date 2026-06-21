import User from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async(req,res)=>{
    try {
        const { email, password } = req.body;

     
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,

        })
    }
}

export const getUserById=async(req,res)=>{
  try {
    const{id}=req.params;
    const user = await User.findById(id)
    if(!user){
      return res.status(400).json({
        success:false,
        message:"user not exists"
      })
      
    }
    res.status(200).json({
      success:true,
      message:"user is successfully found by id",
      user
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message || "user is unable to found by id"
    })
  }
}
export const getAllUser =async(req,res)=>{
    try {
        const users=await User.find().select("-password")
        res.status(200).json({
      success: true,
      users,
    });

    } catch (error) {
            res.status(500).json({
      success: false,
      message: error.message,
    });

    }
}

export const deleteUser=async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).json({
        message: "User not found",
      });
        }
         res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export const updateUser = async(req,res)=>{
 try {
   const{id}=req.params
   const user = await User.findByIdAndUpdate(id,req.body,{ 
         new:true,
         runValidators:true   
   })
   if(!user){
     return res.status(404).json({
       success:false,
       message:'user not found'
     })
   }
   res.status(200).json({
     success:true,
     message:"user updated successfully",
     user
   })
 } catch (error) {
   res.status(500).json({
      success: false,
      message: error.message,
    });
 }
}