import express from 'express'
import cors from 'cors'
import "dotenv/config";
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js"
import examRoutes from "./routes/examRoutes.js"
import assignmentRoutes from "./routes/assignmentRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"
import detailsRoutes from "./routes/detailsRoutes.js"
import enrollmentRoutes from "./routes/enrollmentRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import questionsRoutes from "./routes/questionsRoutes.js"
import classRoutes from "./routes/classRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import databaseRoutes from "./routes/databaseRoutes.js"
import fileRoutes from "./routes/fileRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import noticeRoutes from "./routes/noticeRoutes.js"
import uploadOnCloudinary from './controller/cloudinary.js';



const app = express()
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kanya-digital-platform-seven.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json())
connectDB()

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/exams", examRoutes);
app.use("/api/v1/assignment", assignmentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/stats", detailsRoutes);
app.use("/api/v1/enrollment",enrollmentRoutes );
app.use("/api/v1/payment",paymentRoutes );
app.use("/api/v1/question",questionsRoutes );
app.use("/api/v1/class",classRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);
app.use("/api/v1/database",databaseRoutes);
app.use("/api/v1/file",fileRoutes);
app.use("/api/v1/note",noteRoutes);
app.use("/api/v1/notice",noticeRoutes);


const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})