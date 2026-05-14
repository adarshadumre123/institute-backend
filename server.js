import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import authRoutes from "./routes/authRoutes.js"
import examRoutes from "./routes/examRoutes.js"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
connectDB()

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/exams", examRoutes);


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
    
})