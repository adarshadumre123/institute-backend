import Question from "../models/questionModel.js";

export const createQuestion = async (req, res) => {
  try {
    const {
      question,
      options,
      correctAnswer,
      subject,
      marks,
      setNumber,
    } = req.body;

    if (!question || !options || !correctAnswer || !subject || !marks || !setNumber) {
      return res.status(400).json({
        success: false,
        message: "All required field must be provided"
      })
    }

    if (!Array.isArray(options) || options.length < 4) {
      return res.status(400).json({
        success: false,
        message: "options must be in array form with atleast 4 items"
      })
    }

    if (!options.includes(correctAnswer)) {
      return res.status(400).json({
        success: true,
        message: 'correct answer must be from one the options'
      })
    }


    const newQuestion = await Question.create({
      question,
      options,
      correctAnswer,
      subject,
      marks,
      setNumber,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question: newQuestion,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBulkQuestions = async (req, res) => {
  try {
    const questions = req.body
    if (!Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: "send array of questions"
      })
    }
    const formatted = questions.map((q) => ({
      ...q,
      createdBy: req.user.id
    }
    ))

    const result = await Question.insertMany(formatted);
    res.status(200).json({
      success:true,
      message:`${result.length} question are created`
    })
  } catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  })
}
}

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("createdBy", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      questions,
      message:"questions are get succesfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("createdBy", "firstName lastName email");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuestionsBySet = async (req, res) => {
  try {
    const { setNumber } = req.params;

    const questions = await Question.find({ setNumber });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};