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
            const token = generateToken(user._id, res)
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
    res.send("login")
}

export const logout = async (req, res) => {
    res.send("logout")
}