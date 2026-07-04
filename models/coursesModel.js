import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
   

    subject: {
      type: String,
      required: true,
    },

     shortDescription: {
      type: String,
      required: true,
    },
     longDescription: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);