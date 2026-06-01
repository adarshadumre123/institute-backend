import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js"
import examRoutes from "./routes/examRoutes.js"
import assignmentRoutes from "./routes/assignmentRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import detailsRoutes from "./routes/detailsRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())
connectDB()

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/exams", examRoutes);
app.use("/api/v1/assignment", assignmentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/stats", detailsRoutes);


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})