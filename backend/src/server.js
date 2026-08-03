import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import { connectDB } from "./lib/db.js"
import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import cookieParser from "cookie-parser";


import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
    connectDB()
})