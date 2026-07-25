import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"

export const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be atleast 6 characters" })
    }

    const existingEmail = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" })
    }

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      username,
      email,
      password: hashedPassword
    })

    if (user) {
      generateToken(user._id, res)
      await user.save()

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
      })
    } else {
      return res.status(400).json({ message: "Invalid user data" })
    }

  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" })
    }
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    generateToken(user._id,res)

    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
      })
  } catch (error) {
    console.log("Error in login controller", error.message)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const logout = (req, res) => {
 try {
  res.cookie("jwt","",{maxAge:0})
   return res.status(200).json({ message: "Logged Out Sucessfully" })
 } catch (error) {
   console.log("Error in logout controller", error.message)
    res.status(500).json({ message: "Internal Server Error" })
 }
}

export const updateProfile = (req, res) => {
  
}
