import Assignment from '../models/assignmentModel.js'
import  bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const createAssignment = async (req, res) => {
   try {
      const { title, subject, course, description } = req.body

      if (!title || !course || !subject || !description) {
         return res.status(400).json({
            success: false,
            message: "all fields are required for exam"
         })
      }
      // check user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
      if (req.user.role !== "teacher") {
         return res.status(400).json({
            success: false,
            message: "Only teacher are authorized"
         })
      }

      const assignment = Assignment.create({
         title,
         subject,
         course,
         description,
         createdBy:req.user._id
      })

      res.status(200).json({
         success: true,
         message: "assignment create successfully",
         assignment
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}



// import Groq from "groq-sdk";

// console.log("Controller GROQ:", process.env.GROQ_API_KEY);


// export const generateAssignment = async (req, res) => {
//    const groq = new Groq({
//      apiKey:process.env.GROQ_API_KEY,
//    });
//   try {
//     const {
//       title,
//       subject,
//       course,
//       description,
//       totalQuestions,
//       difficulty,
//       numberOfQuestion
//     } = req.body;

//     if (
//       !title ||
//       !subject ||
//       !course ||
//       !description ||
//       !totalQuestions ||
//       !difficulty,
//       !numberOfQuestion
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const prompt = `
// Generate a structured academic assignment:

// Title: ${title}
// Subject: ${subject}
// Course: ${course}
// Description: ${description}
// Total Questions: ${totalQuestions}
// Difficulty: ${difficulty}
// numberOfQuestion:${numberOfQuestion}

// Return:
// 1. Assignment Title
// 2. Subject
// 3. Course
// 4. ${totalQuestions} Questions with proper numbering
// 5. give me 5 questions
// `;

//     const response = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       model: "llama-3.1-8b-instant"
//     });

//     const result = response.choices[0].message.content;

//     res.status(200).json({
//       success: true,
//       assignment: result.toString(),
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getAssignment = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("createdBy", "firstName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};