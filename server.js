import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import authRoutes from "./routes/authRoutes.js"
import examRoutes from "./routes/examRoutes.js"
import assignmentRoutes from "./routes/assignmentRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"

dotenv.config()
console.log(process.env.GEMINI_API_KEY)
const app = express()
app.use(cors())
app.use(express.json())
connectDB()

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/exams", examRoutes);
app.use("/api/v1/assignment", assignmentRoutes);
app.use("/api/v1/course", courseRoutes);


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})