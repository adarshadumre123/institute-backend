import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 40,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    passingMarks: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required:true
        },

    allowedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["draft", "scheduled", "live", "completed"],
      default: "scheduled",
    },

    allowRetake: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;