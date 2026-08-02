import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./lib/db.js"
import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
    connectDB()
})