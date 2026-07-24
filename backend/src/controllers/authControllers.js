import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup=async(req,res)=>{
   const{username,email,password}=req.body
  try {
   if(password.length<6){
    return res.status(400).json({message:"Password must be atleast 6 characters"})
   }

   const existingEmail=await User.findOne({email})
   const existingUsername=await User.findOne({username})

   if(existingEmail){
     return res.status(400).json({message:"Email already exists"})
   }

   if(existingUsername){
     return res.status(400).json({message:"Username already exists"})
   }

   const salt=await bcrypt.genSalt(10)
   const hashedPassword=await bcrypt.hash(password,salt )

   const user=new User({
    username,
    email,
    password:hashedPassword
   })

   if(user){
   
   }else{
     return res.status(400).json({message:"Invalid user data"})
   }

  } catch (error) {
    
  }
}

export const login=(req,res)=>{
    res.send("login route")
}

export const logout=(req,res)=>{
    res.send("logout route")
}