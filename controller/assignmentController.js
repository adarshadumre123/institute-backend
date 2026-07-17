import Assignment from '../models/assignmentModel.js'
import bcrypt from 'bcryptjs';
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

    const assignment = await Assignment.create({
      title,
      subject,
      course,
      description,
      createdBy: req.user._id
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





export const getAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.find({
      course:courseId
    })
      .populate("createdBy", "firstName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
      course: courseId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});



export const generateAssignment = async (req, res) => {
  try {
    const { courseId } = req.params
    const { title, subject, description, totalQuestions, difficulty } = req.body
    if (!title || !subject || !description) {
      return res.status(400).json({
        success: true,
        messsage: "all fields are required"
      })
    }
    if (!req.user) {
      return res.status(400).json({
        message: "you are not authorized to generate assignment"
      })
    }

    const prompt = `You are an expert universiy professor.
      Generate a professional assignment using the following details:
      Subject:${subject}
      Difficulty:${difficulty}
      Title:${title}
      Description:${description}
      Number of questions:${totalQuestions}

      Instructions:
- Generate exactly ${totalQuestions} questions.
- Use professional academic language.
- Do not provide answers..
- Provide best and important questions

styling:- there should be gap between question 
all questions have proper spacing and line should be break when question is finished
`;
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert university professor who creates university assignments.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_completion_tokens: 1024,
    });

    const generatedAssignment = completion.choices[0].message.content

    const assignment = await Assignment.create({
      title,
      subject,
      description: generatedAssignment,
      difficulty,
      course: courseId,
      createdBy: req.user._id

    })
    res.status(200).json({
      success: true,
      assignment
    })
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate assignment.",
      error: error.message,
    });
  }
}