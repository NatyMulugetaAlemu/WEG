import mongoose from "mongoose"

export const connectDB=async()=>{
  try {
     const connection= await mongoose.connect(process.env.MONGODB_URL)
     console.log("MongoDB Connected Sucessfully")
  } catch (error) {
    console.log("MongoDB Connection error",error)
  }
}

