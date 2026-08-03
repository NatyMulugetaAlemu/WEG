import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const existingEmail = await User.findOne({ email })
        const existingUsername = await User.findOne({ username })

        if (existingEmail) {
            return res.status(400).json({ message: "email already exists" })
        }

        if (existingUsername) {
            return res.status(400).json({ message: "username already exists" })
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
            res.status(400).json({ message: "Invalid User data" })
        }

    } catch (error) {
        console.log("Eror in signup controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body
    try {
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "ProfilePic is Required" })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        res.status(200).json(updatedUser)

    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}